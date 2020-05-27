const config = {
  IS_DEV:
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'staging',
  PORT: process.env.PORT || 7070
};

config.STYLE_NAME =
  process.env.STYLE_NAME || config.IS_DEV ? 'damsanx_stg' : 'damsanx_prod';

config.API_HOST_NAME = config.IS_DEV
  ? '' // staging
  : ''; // production

config.WS_API_HOST_NAME = config.IS_DEV ? '' : '';

config.GRAPHQL_HTTP_URI = `https://${config.API_HOST_NAME}/graphql`;

config.GRAPHQL_WS_URI = `wss://${config.API_HOST_NAME}/graphql`;

module.exports = config;
