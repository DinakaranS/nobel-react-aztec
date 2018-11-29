import React, { PropTypes } from 'react';
import TooltipComponent from '../TooltipComponent';

/** Checkbox Component */
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
  }
  onCheck(...args) {
    if (typeof this.props.onCheck === 'function') {
      this.props.onCheck(this.props.control, ...args);
    }
  }
  render() {
    const props = this.props;
    const CHECKBOX = props.library[props.component];
    return (<div style={{ display: 'flex' }} >
      <CHECKBOX {...props.attributes} onCheck={this.onCheck} />
      {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
    </div>);
  }
}

Checkbox.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
  onCheck: PropTypes.func
};
export default Checkbox;
