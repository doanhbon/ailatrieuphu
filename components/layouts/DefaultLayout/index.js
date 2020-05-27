import React from 'react';
import PropTypes from 'prop-types';

const DefaultLayout = props => <main>{props.children}</main>;

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};
DefaultLayout.defaultProps = {
  children: {}
};
