import React from 'react';
import PropTypes from 'prop-types';

const Style = ({ children }) => <style jsx="true">{children}</style>;

export default Style;

Style.propTypes = {
  children: PropTypes.objectOf(PropTypes.any)
};
Style.defaultProps = {
  children: {}
};
