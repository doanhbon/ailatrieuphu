import React from 'react';

import { useWindowSize } from 'common/helper';

const UsingWindowSizeHOC = Component => props => {
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
      {...props}
      // {...pageProps}
    />
  );
};

export default UsingWindowSizeHOC;
