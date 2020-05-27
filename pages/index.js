/* eslint-disable react/no-unused-prop-types */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import SearchPage from 'components/SearchPage';
// import SearchLayout from 'components/layouts/SearchLayout';
import UsingWindowSizeHOC from 'components/common/UsingWindowSizeHOC';
import Index from 'components/index';

class HomePage extends PureComponent {
  render() {
    const { query } = this.props;
    return <Index query={query} />;
  }
}

const HomePageHOC = UsingWindowSizeHOC(HomePage);

HomePageHOC.getInitialProps = async ({ query, req }) => {
  let isServer = false;
  if (req) {
    isServer = true;
  }

  return { query, isServer };
};

export default HomePageHOC;

HomePage.pageName = 'HomePage';

HomePage.propTypes = {
  query: PropTypes.objectOf(PropTypes.any),
  mobileMode: PropTypes.bool,
  ipadMode: PropTypes.bool,
  desktopMode: PropTypes.bool
};
HomePage.defaultProps = {
  query: {},
  mobileMode: false,
  ipadMode: false,
  desktopMode: true
};
