import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import icons from './icons.json';

class IconInner extends PureComponent {
  createMarkup(markup) {
    // sanitize markup first
    const sanitizedMarkup = DOMPurify.sanitize(markup);
    // now do the weird thing for dangerouslySetInnerHTML
    return {__html: sanitizedMarkup};
  }
  render() {
    // <g> is just a wrapper it does nothing except let me use valid JSX markup
    const { icon } = this.props;
    const iconMarkup = icons[icon];

    if (iconMarkup) {
      return (
        <g  />
      );
    }
    return null;
  }
}

IconInner.propTypes = {
  icon: PropTypes.string.isRequired
};

export default IconInner;
