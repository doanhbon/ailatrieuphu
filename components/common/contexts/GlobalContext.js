/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
// import PropTypes from 'prop-types';
import Menu from 'components/common/Menu';

const dataAdviceLogo = '../../../static/favicon.ico';

const GlobalContext = React.createContext();
const GlobalConsumer = GlobalContext.Consumer;

const defaultMeta = {
  title: 'Ai là nhà tâm lý học',
  url: '',
  description: 'Ai là nhà tâm lý học',
  image: dataAdviceLogo
};

const renderHelmet = meta => (
  <Helmet
    htmlAttributes={{ lang: 'en' }}
    title={meta.title}
    meta={[
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        property: 'description',
        content: meta.description
      },
      {
        property: 'og:title',
        content: meta.title
      },
      {
        property: 'og:url',
        content: meta.url
      },
      {
        property: 'og:image',
        content: meta.image
      },
      {
        name: 'google-signin-client_id',
        content:
          '793954060088-4sojc5hol0hgmtlrr2d1mjrnj6hfrhef.apps.googleusercontent.com'
      },
      {
        name: 'google-site-verification',
        content: 'zHHc15iquvj1U5zMmb1xx9HY7QRFifz3ZHtuUoDhrmM'
      }
    ]}
    link={[
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: meta.image
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css'
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css'
      }
    ]}
    script={[
      {
        src: 'https://apis.google.com/js/platform.js',
        async: true,
        defer: true
      }
    ]}
  />
);

const GlobalProvider = props => {
  const [state, setState] = useState({
    meta: defaultMeta,
    menu: null,
    auth: null
  });

  const renderMeta = meta => {
    const newMeta = meta || defaultMeta;

    if (newMeta !== state.meta) {
      setState({ ...state, meta: newMeta });
    }
  };

  const renderMenu = menu => {
    if (menu !== state.menu) {
      setState({ ...state, menu });
    }
  };

  const { meta, menu } = state;

  return (
    <GlobalContext.Provider
      value={{
        state,
        renderMeta,
        renderMenu
      }}
    >
      {meta && renderHelmet(meta)}
      {menu && <Menu menu={menu} />}
      {props.children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalConsumer, GlobalProvider };
