import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ActionClear from 'material-ui/svg-icons/content/clear';
import { grey700 } from 'material-ui/styles/colors';
// import validation from './../../helpers/validation';
import TooltipComponent from '../TooltipComponent';

function transformAttrs(props) {
  const { control, attributes } = props || {};
  const {
    value,
    minDate,
    maxDate
  } = attributes;
  const { isUTC = false } = control;
  let formatedValue = value ? new Date(moment(value).format()) : undefined;
  if (isUTC && value) {
    const UTC = moment.utc(value);
    const localTime = moment.utc(UTC).toDate();
    formatedValue = new Date(moment(localTime).format());
  }
  const modifiedAttrs = {
    value: formatedValue,
    minDate: minDate ? new Date(moment(minDate).format()) : (minDate === undefined) ? undefined : new Date(),
    maxDate: maxDate ? new Date(moment(maxDate).format()) : (maxDate === undefined) ? undefined : new Date()
  };
  return Object.assign({}, props.attributes, modifiedAttrs);
}

/** DatePicker Component */
class DatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: '',
      attributes: props ? transformAttrs(props) : {},
      transformedAttrs: props ? transformAttrs(props) : {}
    };

    this.onChange = this.onChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onTouchTap = this.onTouchTap.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.clear = this.clear.bind(this);
  }
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(props) {
    const attrs = transformAttrs(props);
    this.setState({
      attributes: attrs,
      transformedAttrs: attrs
    });
  }
  onShow(...args) {
    if (typeof this.props.onShow === 'function') {
      this.props.onShow(this.props.control, ...args);
    }
  }
  formatDate(date) {
    const { control } = this.props
    const { format } = control;
    const dateTime = moment(new Date());
    const finalData = moment(date).set({
      hour: dateTime.get('hour'),
      minute: dateTime.get('minute'),
      second: dateTime.get('second')
    })
    if (format) {
      return finalData.format(format);
    }
    return finalData.format('L');
  }
  onChange(...args) {
    const attrs = Object.assign({}, this.state.transformedAttrs, {
      value: args[1]
    });
    this.setState({
      attributes: attrs
    });
    if (typeof this.props.onChange === 'function') {
      const dateTime = moment(new Date()).utc();
      const { control } = this.props || {};
      const { format = 'YYYY-MM-DD HH:mm:ss' } = control;
      args[1] = moment(args[1]).set({
        hour: dateTime.get('hour'),
        minute: dateTime.get('minute'),
        second: dateTime.get('second')
      }).format(format);
      this.props.onChange(this.props.control, ...args);
    }
  }
  onDismiss(...args) {
    if (!args[0]) return;
    const props = this.props;
    if (typeof props.onDismiss === 'function') {
      props.onDismiss(props.control, ...args);
    }
  }
  onFocus(...args) {
    if (typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.props.control, ...args);
    }
  }
  onTouchTap(...args) {
    if (typeof this.props.onTouchTap === 'function') {
      this.props.onTouchTap(this.props.control, ...args);
    }
  }
  clear() {
    const attrs = Object.assign({}, this.state.transformedAttrs, {
      value: null
    });
    this.setState({
      attributes: attrs
    });
    if (typeof this.props.onChange === 'function') {
      this.props.onChange(this.props.control, null, null);
    }
  }
  render() {
    const props = this.props;
    const DATEPICKER = props.library[props.component];
    const wrapperStyle = Object.assign({}, {
      position: 'relative',
      display: (props.attributes.wrapperStyle && props.attributes.wrapperStyle.display ? props.attributes.wrapperStyle.display : 'contents')
    }, props.attributes.wrapperStyle);
    const closeStyle = Object.assign({}, {
      position: 'relative',
      cursor: 'pointer',
      top: ((props.attributes.closeStyle && props.attributes.closeStyle.top) ? props.attributes.closeStyle.top : (props.control && props.control.props.floatingLabelText) ? '34px' : '12px'),
      display: props.attributes.clear ? 'block' : 'none'
    }, props.attributes.closeStyle);
    return (
      <div style={{ display: 'flex' }}>
        <div style={wrapperStyle}>
          <DATEPICKER {...this.state.attributes} errorText={this.state.errorText} onChange={this.onChange} onFocus={this.onFocus} onShow={this.onShow} onDismiss={this.onDismiss} onTouchTap={this.onTouchTap} formatDate={this.formatDate} />
        </div>
        <div style={{ display: 'inline-flex' }}>
          <ActionClear color={grey700} style={closeStyle} onClick={this.clear} />
          {this.props.attributes.tooltip && <TooltipComponent tooltip={this.props.attributes.tooltip} />}
        </div>
      </div>);
  }
}

DatePicker.propTypes = {
  library: PropTypes.object,
  component: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  control: PropTypes.object,
  option: PropTypes.string.isRequired,
  rules: PropTypes.object,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onDismiss: PropTypes.func,
  onShow: PropTypes.func,
  onTouchTap: PropTypes.func,
  format: PropTypes.string,
  wrapperStyle: PropTypes.object,
  closeStyle: PropTypes.object
};
export default DatePicker;
