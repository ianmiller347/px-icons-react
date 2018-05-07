import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import icons from './icons.json';

// this is basically a clone of "Feather Icons React", edited for Predix UI Icons.
// main difference is that this lib uses full svg markup
// until viewBox attribute can be set for each one, or it is parsed,
// will need to have this weird span wrapper :\

class PxIcon extends Component {
  createMarkup(markup, size) {
    // sort of a hacky mess to set the width height to what user passes.
    // can be updated when the icons.json does not need non-square viewBox.
    // also change this component to accept width and height for non-square icons.
    const widthHeightAttr = `width="${size}" height="${size}"`;
    const editedMarkup = markup.replace(/viewBox="([^"]+)"/, `viewBox="$1" ${widthHeightAttr}`)
    // sanitize markup first
    const sanitizedMarkup = DOMPurify.sanitize(markup);
    // now do the weird thing for dangerouslySetInnerHTML
    return {__html: sanitizedMarkup};
  }

  render() {
    const { icon, size, className, ...otherProps } = this.props;
    // make a "css class friendly" name for the icon (no colon)
    const classFriendlyText = icon.replace(':', '-');
    // take out "px-" from icon name if applicable.
    // this way, user can do both px-util:close and util:close
    const iconNoPx = icon.replace('px-', '');
    const iconMarkup = icons[iconNoPx];

    // just wrapping in a span for this early version.
    // currently, icons.json has svg in it and needs that for proper viewBox
    // size attribute won't work properly, but use CSS for that.
    if (iconMarkup) {
      return (
        <span
          className={`px-icon icon-${classFriendlyText} ${className}`}
          {...otherProps}
          dangerouslySetInnerHTML={this.createMarkup(iconMarkup, size)} 
        />
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
