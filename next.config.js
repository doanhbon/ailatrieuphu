require('dotenv').config();
const webpack = require('webpack');
const path = require('path');
const withImages = require('next-images');
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withLess = require('@zeit/next-less');

const AntdScssThemePlugin = require('antd-scss-theme-plugin');

const configs = require('./config');

const avoidPaths = ['node_modules'].map(dir => path.join(__dirname, dir));

module.exports = withImages(
  withCSS(
    withSass(
      withLess({
        cssModules: false,
        cssLoaderOptions: {
          getLocalIdent: (
            loaderContext,
            // localIdentName,
            localName
            // options
          ) => {
            const fileName = path.basename(loaderContext.resourcePath);
            const shouldTransform = !avoidPaths.some(avoid =>
              loaderContext.resourcePath.includes(avoid)
            );

            if (!shouldTransform) {
              return localName;
            }

            const name = fileName.replace(/\.[^/.]+$/, '');
            return `${configs.STYLE_NAME}--${name}-${localName}`;
          }
        },
        webpack: (cf, { isServer }) => {
          const config = { ...cf };
          if (isServer) {
            const antStyles = /antd\/.*?\/style\/css.*?/;
            const origExternals = [...config.externals];
            config.externals = [
              (context, request, callback) => {
                if (request.match(antStyles)) return callback();
                if (typeof origExternals[0] === 'function') {
                  origExternals[0](context, request, callback);
                } else {
                  callback();
                }
              },
              ...(typeof origExternals[0] === 'function' ? [] : origExternals)
            ];

            config.module.rules.unshift({
              test: antStyles,
              use: 'null-loader'
            });
          }

          config.resolve.alias.assets = path.join(__dirname, 'assets');
          config.resolve.alias.docImgs = path.join(__dirname, 'doc_imgs');
          config.resolve.alias.core = path.join(__dirname, 'core');
          config.resolve.alias.layouts = path.join(__dirname, 'layouts');
          config.resolve.alias.components = path.join(__dirname, 'components');
          config.resolve.alias.utils = path.join(__dirname, 'utils');
          config.resolve.alias.common = path.join(__dirname, 'common');
          config.resolve.alias.const = path.join(__dirname, 'constants');
          config.resolve.alias.mockData = path.join(__dirname, 'mockData');
          config.resolve.alias.constType = path.join(__dirname, 'constType');
          config.resolve.alias.reducers = path.join(__dirname, 'reducers');
          config.resolve.alias.actions = path.join(__dirname, 'actions');
          config.plugins.push(new webpack.EnvironmentPlugin(process.env));
          config.resolve.alias.antd = path.join(__dirname, 'node_modules/antd');
          config.resolve.alias.GA = path.join(
            __dirname,
            'components/common/GA'
          );
          config.plugins.push(new AntdScssThemePlugin('./theme.scss'));
          config.module.rules.push({
            type: 'javascript/auto',
            test: /\.json/,
            use: [require.resolve('json-loader')]
          });
          config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            use: [
              {
                loader: require.resolve('url-loader'),
                options: {
                  limit: config.inlineImageLimit,
                  fallback: require.resolve('file-loader'),
                  publicPath: `${config.assetPrefix}/_next/static/images/`,
                  outputPath: `${isServer ? '../' : ''}static/images/`,
                  name: '[name]-[hash].[ext]',
                  esModule: config.esModule || false
                }
              }
            ]
          });
          config.node = {
            dns: 'mock',
            fs: 'empty',
            path: true,
            url: false,
            net: 'empty',
            tls: 'empty',
            child_process: false
          };
          return config;
        }
      })
    )
  )
);
