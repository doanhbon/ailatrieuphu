const dev = process.env.NODE_ENV !== 'production';
const express = require('express');
const next = require('next');
const cors = require('cors');
const { parse } = require('url');
const { join } = require('path');

const routes = require('./core/routes');
const config = require('./config');

// console.log('dev: ', dev);
const app = next({
  dev
  // dir: './next'
});
const handler = routes.getRequestHandler(app);

// const redirects = [
//   { from: '/', to: '/homepage' },
//   { from: '/home', to: '/homepage' }
// ];
const rootStaticFiles = ['/robots.txt', '/sitemap.xml', '/favicon.ico'];

// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.prepare().then(() => {
  const server = express();

  // redirects.forEach(({ from, to, type = 301, method = 'get' }) => {
  //   server[method](from, (req, res) => {
  //     res.redirect(type, to);
  //   });
  // });

  server.get('*', (req, res) => {
    // console.log('req.url: ', req.url);
    const parsedUrl = parse(req.url, true);

    if (rootStaticFiles.indexOf(parsedUrl.pathname) > -1) {
      const path = join(__dirname, 'static', parsedUrl.pathname);

      return app.serveStatic(req, res, path);
    }

    return handler(req, res, parsedUrl);
  });

  server.use(cors());

  server.listen(config.PORT, err => {
    if (err) {
      throw err;
    }
    /* eslint-disable-next-line */
    console.log(`> Ready on http://localhost:${config.PORT}`);
  });
});
