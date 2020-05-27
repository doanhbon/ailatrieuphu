/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
// import SearchPage from 'components/SearchPage';
// import SearchLayout from 'components/layouts/SearchLayout';
import UsingWindowSizeHOC from 'components/common/UsingWindowSizeHOC';
import Win from 'components/wingame';

class WinPage extends PureComponent {
  render() {
    const { query } = this.props;
    return <Win query={query} />;
  }
}

const WinPageHOC = UsingWindowSizeHOC(WinPage);

WinPageHOC.getInitialProps = async ({ query, req }) => {
  let isServer = false;
  if (req) {
    isServer = true;
  }

  return { query, isServer };
};

export default WinPageHOC;

WinPage.pageName = 'WinPage';
