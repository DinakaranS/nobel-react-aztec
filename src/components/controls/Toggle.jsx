import React from 'react';
import PropTypes from 'prop-types';
import TooltipComponent from '../TooltipComponent';

/** Toggle Component */
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }
  onToggle(...args) {
    if (typeof this.props.onToggle === 'function') {
      this.props.onToggle(this.props.control, ...args);
    }
  }
  render() {
    const props = this.props;
    const TOGGLE = props.library[props.component];
    return (<div style={{ display: 'flex' }}>
      <TOGGLE {...props.attributes} onToggle={this.onToggle} />
      {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
    </div>)
  }
}

Toggle.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  rules: PropTypes.object,
  onToggle: PropTypes.func
};
export default Toggle;
