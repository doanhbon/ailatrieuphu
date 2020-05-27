/* eslint-disable no-multi-assign */
const NProgress = require('nprogress');
const nextRoutes = require('next-routes');

const routes = (module.exports = nextRoutes());

routes.Router.onRouteChangeStart = () => {
  NProgress.start();
};

routes.Router.onRouteChangeComplete = () => {
  NProgress.done();
};

routes.Router.onRouteChangeError = () => {
  NProgress.done();
};

routes.add('HomePage', '/homepage', 'index');
routes.add('GamePage', '/play', 'play');
routes.add('WinPage', '/win', 'win');
routes.add('InstructionPage', '/instruction', 'instruction');
