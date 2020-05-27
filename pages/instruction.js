/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
// import SearchPage from 'components/SearchPage';
// import SearchLayout from 'components/layouts/SearchLayout';
import UsingWindowSizeHOC from 'components/common/UsingWindowSizeHOC';
import Instruction from 'components/instructionpage';

class InstructionPage extends PureComponent {
  render() {
    const { query } = this.props;
    return <Instruction query={query} />;
  }
}

const InstructionPageHOC = UsingWindowSizeHOC(InstructionPage);

InstructionPageHOC.getInitialProps = async ({ query, req }) => {
  let isServer = false;
  if (req) {
    isServer = true;
  }

  return { query, isServer };
};

export default InstructionPageHOC;

InstructionPage.pageName = 'InstructionPage';
