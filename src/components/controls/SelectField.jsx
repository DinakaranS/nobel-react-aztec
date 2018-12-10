import React, { PropTypes } from 'react';
import validation from './../../helpers/validation';
import TooltipComponent from '../TooltipComponent';
import MenuItem from 'material-ui/MenuItem';

/** SelectField Component */
class SelectField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.attributes.selected,
      errorText: props.attributes.errorText || '',
    };
    this.onChange = this.onChange.bind(this);
    this.selectionRenderer = this.selectionRenderer.bind(this);
  }

  componentWillReceiveProps(props) {
    this.state = {
      value: props.attributes.selected,
      errorText: props.attributes.errorText || ''
    };
  }

  validate(value) {
    let isValid = true;
    if (this.props.rules && this.props.rules.validation) {
      for (const data of this.props.rules.validation) {
        isValid = validation[data.rule](value, data.value);
        if (!isValid) {
          return {
            isValid: false,
            message: data.message
          };
        }
      }
    }
    return {
      isValid: true,
      message: ''
    };
  }

  onChange(...args) {
    const validator = this.validate(args[2]);
    if (!validator.isValid) {
      this.setState({
        errorText: validator.message,
        value: args[2]
      });
    } else {
      this.setState({
        errorText: '',
        value: args[2]
      });
    }
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, ...args);
    }
  }

  menuItemsDetails(values) {
    return this.props.control.options.map((d, value) => (
      <MenuItem
        key={d.primaryText}
        insetChildren
        checked={values && values.indexOf(d.value) > -1}
        value={d.value}
        primaryText={d.primaryText}
      />
    ));
  }

  selectionRenderer(values) {
    if (!this.props.attributes.multiple) { return this.getProperData(values); }
    switch (values.length) {
      case 0:
        return '';
      case 1:
        return this.getProperData(values[0]);
      default:
        return this.props.control.props.floatingLabelText ? `${values.length} ${this.props.control.props.floatingLabelText.toLowerCase()} selected` :`${values.length} items selected`;
    }
  }

  getProperData(value){
    const b = this.props.control.options.find(function (a) {
      return value && a.value && a.value === value;
    });
    return (b && b.primaryText) || '';
  }

  render() {
    const props = this.props;
    const SELECTFIELD = this.props.library[props.component];
    const OPTION = this.props.library[props.option];
    const { value } = this.state;
    return (
      <div style={{ display: 'flex' }}>
        <SELECTFIELD {...props.attributes} value={this.state.value} errorText={this.state.errorText} onChange={this.onChange} selectionRenderer={this.selectionRenderer}>
          {props.attributes.multiple ? this.menuItemsDetails(value) : this.props.control.options.map((option, index) => {
            return (
              <OPTION {...option} key={index}>
                {}
              </OPTION>
            );
          })}
        </SELECTFIELD>
        {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
      </div>
    );
  }
}

SelectField.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func
};
export default SelectField;
