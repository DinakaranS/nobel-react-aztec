import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Label Component */
const Label = props => (<div {...props.attributes}>
  <div style={{ display: 'flex' }} >
    <span>{props.attributes.text}</span>
    {props.attributes.tooltip && <TooltipComponent tooltip={props.attributes.tooltip} />}</div>
</div>);

Label.propTypes = {
  attributes: PropTypes.object
};
export default Label;
