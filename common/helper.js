/* eslint-disable no-prototype-builtins */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import queryString from 'query-string';
import React, { useState, useEffect, Component } from 'react';
import * as Validator from 'common/validator';

const ruleArray = [
  {
    score: 0,
    labelPass: 'weak',
    percent: 10,
    color: 'red'
  },
  {
    score: 1,
    labelPass: 'weak',
    percent: 25,
    color: 'red'
  },
  {
    score: 2,
    labelPass: 'normal',
    percent: 50,
    color: 'orange'
  },
  {
    score: 3,
    labelPass: 'good',
    percent: 75,
    color: 'yellow'
  },
  {
    score: 4,
    labelPass: 'strong',
    percent: 100,
    color: 'green'
  }
];

export const upperCaseTheFirstLetter = str => {
  if (typeof str !== 'string') return '';
  const lower = str.toLowerCase();
  return str.toUpperCase().charAt(0) + lower.slice(1);
};

export const formatNumber = num => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const getUrl = paramObject => {
  let paramStr;
  if (paramObject && Object.keys(paramObject).length > 0) {
    Object.keys(paramObject).forEach(item => {
      if (paramObject[item] === '') {
        delete paramObject[item];
      }
    });
    paramStr = queryString.stringify(paramObject);
  } else {
    paramStr = '';
  }
  return paramStr;
};

export const serialize = (obj, prefix) => {
  const str = [];
  let p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? `${prefix}[${p}]` : p;
      const v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? serialize(v, k)
          : `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
      );
    }
  }
  return str.join('&');
};

// Hook
export const useWindowSize = () => {
  const getSize = () => {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  };

  const isClient = typeof window === 'object';
  const [windowSize, setWindowSize] = useState(getSize);

  const handleResize = () => {
    setWindowSize(getSize());
  };

  useEffect(() => {
    if (!isClient) {
      return false;
    }

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
};

export const withHooksHOC = () => {
  const windowSize = useWindowSize();
  const mobileMode = windowSize && windowSize.width <= 767;
  const ipadMode =
    windowSize && windowSize.width > 767 && windowSize.width <= 1200;
  const desktopMode = windowSize && windowSize.width > 1200;
  return (
    <Component
      mobileMode={mobileMode}
      ipadMode={ipadMode}
      desktopMode={desktopMode}
    />
  );
};

export const handleGetScore = password => {
  let score = 0;

  if (password.length >= 8 && password.length <= 20) {
    score++;
  }
  if (Validator.hasNumber(password)) {
    score++;
  }
  if (Validator.hasMixed(password)) {
    score++;
  }
  if (Validator.hasSpecial(password)) {
    score++;
  }

  return score;
};

export const handlePasswordStrength = (password, callback) => {
  const score = handleGetScore(password);
  ruleArray.forEach(item => {
    if (item.score === score) {
      callback(item);
    }
  });
};
