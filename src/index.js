import React, { Component } from 'react';
import PropTypes from 'prop-types';
import icons from './icons.json';

// this is basically a clone of "Feather Icons React", edited for Predix UI Icons.
// main difference is that this lib uses full svg markup
// so a regex is called to pull the viewBox attribute and use it.
// it defaults to 24x24, but px icons are not based on that grid.
// until all px icons are based on the same grid, 
// or another attribute is passed to describe which grid to use,
// this viewBox attribute needs to be passed accordingly.

class PxIcon extends Component {
  createMarkup(markup, size) {
    // we arent sanitizing markup right now, bc DOMPurify does not like self-closing tags.
    // now do the weird thing for dangerouslySetInnerHTML
    return {__html: markup};
  }

  render() {
    const { icon, size, className, ...otherProps } = this.props;
    // make a "css class friendly" name for the icon (no colon)
    const classFriendlyText = icon.replace(':', '-');
    // take out "px-" from icon name if applicable.
    // this way, user can do both px-util:close and util:close
    const iconNoPx = icon.replace('px-', '');
    const iconMarkup = icons[iconNoPx];
    const insides = iconMarkup
      .replace(/<svg ([^>]+)>/, '')
      .replace('</svg>', '');
    const viewBoxAttr = iconMarkup.match(/viewBox="([^"]+)"/)[1] || '0 0 24 24';

    if (iconMarkup) {
      return (
        <svg
          width={size}
          height={size}
          viewBox={viewBoxAttr}
          className={`px-icon icon-${classFriendlyText} ${className}`}
          {...otherProps}>
          <g dangerouslySetInnerHTML={this.createMarkup(insides, size)} />
        </svg>
      );
    }
    return null;
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
