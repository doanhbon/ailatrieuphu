import React from 'react';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
// the hoc
import { withNamespaces } from 'react-i18next';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import allReducers from 'reducers';
import thunk from 'redux-thunk';
import { GlobalProvider } from 'components/common/contexts/GlobalContext';
import DefaultLayout from 'components/layouts/DefaultLayout';
import { urlHelper } from 'utils';
import '../i18n';
import 'antd/dist/antd.css';
import 'assets/styles/main.scss';

const CACHE = {
  STATE: {}
};

const state = JSON.parse(JSON.stringify(CACHE.STATE));

const store = createStore(allReducers, state, applyMiddleware(thunk));

class DataAdvice extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, router, t } = this.props;
    const currentHelper = urlHelper[`getUrl${Component.pageName}`] || false;

    const CurrentLayout = currentHelper
      ? currentHelper(router.query).layout
      : DefaultLayout;

    const initProps = currentHelper
      ? currentHelper(router.query).initProps
      : {};

    const route = currentHelper ? currentHelper(router.query).route : {};

    return (
      <Provider store={{ ...store, t }}>
        <GlobalProvider>
          <CurrentLayout {...initProps}>
            <Component {...pageProps} t={t} route={route} />
          </CurrentLayout>
          <ToastContainer newestOnTop closeOnClick autoClose={2000} />
        </GlobalProvider>
      </Provider>
    );
  }
}

export default withNamespaces()(DataAdvice);
