/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
// import SearchPage from 'components/SearchPage';
// import SearchLayout from 'components/layouts/SearchLayout';
import UsingWindowSizeHOC from 'components/common/UsingWindowSizeHOC';
import GamePlay from 'components/gameplay';

class GamePage extends PureComponent {
  render() {
    const { query } = this.props;
    return <GamePlay query={query} />;
  }
}

const GamePageHOC = UsingWindowSizeHOC(GamePage);

GamePageHOC.getInitialProps = async ({ query, req }) => {
  let isServer = false;
  if (req) {
    isServer = true;
  }

  return { query, isServer };
};

export default GamePageHOC;

GamePage.pageName = 'GamePage';
