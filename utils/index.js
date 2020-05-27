import { DefaultLayout } from 'components/layouts';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
// import { getUrl, serialize } from 'common/helper';

export const urlHelper = {
  // getUrlErrorPage: () => ({
  //   layout: DefaultLayout,
  //   initProps: {}
  // }),
  getUrlHomePage: () => ({
    layout: DefaultLayout,
    route: {
      to: '/'
    },
    initProps: {}
  }),

  getUrlGamePage: () => ({
    layout: DefaultLayout,
    route: {
      to: '/play'
    },
    initProps: {}
  }),

  getUrlWinPage: () => ({
    layout: DefaultLayout,
    route: {
      to: '/win'
    },
    initProps: {}
  }),

  getUrlInstructionPage: () => ({
    layout: DefaultLayout,
    route: {
      to: '/instruction'
    },
    initProps: {}
  })
};

function dataFetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, isLoading: true, isError: false };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    default:
      throw new Error();
  }
}

export function useFetch(initialUrl, initialData) {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: true,
    isError: false,
    data: initialData
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    fetchData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  const doFetch = urlF => {
    setUrl(urlF);
  };

  return { ...state, doFetch };
}
