// Body Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';

const TextBody = ({ className, color, weight, children }) => {
  const classNames = classname('o--text-body', className, color, weight);
  return <div className={classNames}>{children}</div>;
};

TextBody.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  weight: PropTypes.string,
  children: PropTypes.node
};

TextBody.defaultProps = {
  className: '',
  color: '',
  weight: '',
  children: ''
};

export default TextBody;
