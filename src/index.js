import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconInner from './IconInner';


// this is basically a clone of "Feather Icons React", edited for Predix UI Icons.
class PxIcon extends Component {
  render() {
    const { icon, size, className, ...otherProps } = this.props;
    // make a "css class friendly" name for the icon (no colon)
    const classFriendlyText = icon.replace(':', '-');
    // take out "px-" from icon name if applicable.
    // this way, user can do both px-util:close and util:close
    const iconNoPx = icon.replace('px-', '');

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`px-icon icon-${classFriendlyText} ${className}`}
        {...otherProps}>
        <IconInner icon={iconNoPx} />
      </svg>
    );
  }
}

PxIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string
}

PxIcon.defaultProps = {
  size: 24,
  className: ''
}

export default PxIcon;
