'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _clear = require('material-ui/svg-icons/content/clear');

var _clear2 = _interopRequireDefault(_clear);

var _colors = require('material-ui/styles/colors');

var _TooltipComponent = require('../TooltipComponent');

var _TooltipComponent2 = _interopRequireDefault(_TooltipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import validation from './../../helpers/validation';


function transformAttrs(props) {
  var _ref = props || {},
      control = _ref.control,
      attributes = _ref.attributes;

  var value = attributes.value,
      minDate = attributes.minDate,
      maxDate = attributes.maxDate;
  var _control$isUTC = control.isUTC,
      isUTC = _control$isUTC === undefined ? true : _control$isUTC;

  var formatedValue = value ? new Date((0, _moment2.default)(value).format()) : undefined;
  if (isUTC && value) {
    var UTC = _moment2.default.utc(value);
    var localTime = _moment2.default.utc(UTC).toDate();
    formatedValue = new Date((0, _moment2.default)(localTime).format());
  }
  var modifiedAttrs = {
    value: formatedValue,
    minDate: minDate ? new Date((0, _moment2.default)(minDate).format()) : minDate === undefined ? undefined : new Date(),
    maxDate: maxDate ? new Date((0, _moment2.default)(maxDate).format()) : maxDate === undefined ? undefined : new Date()
  };
  return Object.assign({}, props.attributes, modifiedAttrs);
}

/** DatePicker Component */

var DatePicker = function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

    _this.state = {
      errorText: '',
      attributes: props ? transformAttrs(props) : {},
      transformedAttrs: props ? transformAttrs(props) : {}
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onDismiss = _this.onDismiss.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.onShow = _this.onShow.bind(_this);
    _this.onTouchTap = _this.onTouchTap.bind(_this);
    _this.formatDate = _this.formatDate.bind(_this);
    _this.clear = _this.clear.bind(_this);
    return _this;
  }
  // eslint-disable-next-line camelcase


  _createClass(DatePicker, [{
    key: 'UNSAFE_componentWillReceiveProps',
    value: function UNSAFE_componentWillReceiveProps(props) {
      var attrs = transformAttrs(props);
      this.setState({
        attributes: attrs,
        transformedAttrs: attrs
      });
    }
  }, {
    key: 'onShow',
    value: function onShow() {
      if (typeof this.props.onShow === 'function') {
        var _props;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_props = this.props).onShow.apply(_props, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'formatDate',
    value: function formatDate(date) {
      var control = this.props.control;
      var format = control.format;

      var dateTime = (0, _moment2.default)(new Date());
      var finalData = (0, _moment2.default)(date).set({
        hour: dateTime.get('hour'),
        minute: dateTime.get('minute'),
        second: dateTime.get('second')
      });
      if (format) {
        return finalData.format(format);
      }
      return finalData.format('L');
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var attrs = Object.assign({}, this.state.transformedAttrs, {
        value: args[1]
      });
      this.setState({
        attributes: attrs
      });
      if (typeof this.props.onChange === 'function') {
        var _props2;

        var _ref2 = this.props || {},
            control = _ref2.control,
            _ref2$isUTC = _ref2.isUTC,
            isUTC = _ref2$isUTC === undefined ? true : _ref2$isUTC;

        var dateTime = isUTC ? (0, _moment2.default)(new Date()).utc() : (0, _moment2.default)(new Date());
        var _control$format = control.format,
            format = _control$format === undefined ? 'YYYY-MM-DD HH:mm:ss' : _control$format;

        args[1] = (0, _moment2.default)(args[1]).set({
          hour: dateTime.get('hour'),
          minute: dateTime.get('minute'),
          second: dateTime.get('second')
        }).format(format);
        (_props2 = this.props).onChange.apply(_props2, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'onDismiss',
    value: function onDismiss() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      if (!args[0]) return;
      var props = this.props;
      if (typeof props.onDismiss === 'function') {
        props.onDismiss.apply(props, [props.control].concat(args));
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      if (typeof this.props.onFocus === 'function') {
        var _props3;

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        (_props3 = this.props).onFocus.apply(_props3, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'onTouchTap',
    value: function onTouchTap() {
      if (typeof this.props.onTouchTap === 'function') {
        var _props4;

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        (_props4 = this.props).onTouchTap.apply(_props4, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'clear',
    value: function clear() {
      var attrs = Object.assign({}, this.state.transformedAttrs, {
        value: null
      });
      this.setState({
        attributes: attrs
      });
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.props.control, null, null);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var DATEPICKER = props.library[props.component];
      var wrapperStyle = Object.assign({}, {
        position: 'relative',
        display: props.attributes.wrapperStyle && props.attributes.wrapperStyle.display ? props.attributes.wrapperStyle.display : 'contents'
      }, props.attributes.wrapperStyle);
      var closeStyle = Object.assign({}, {
        position: 'relative',
        cursor: 'pointer',
        top: props.attributes.closeStyle && props.attributes.closeStyle.top ? props.attributes.closeStyle.top : props.control && props.control.props.floatingLabelText ? '34px' : '12px',
        display: props.attributes.clear ? 'block' : 'none'
      }, props.attributes.closeStyle);
      return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        _react2.default.createElement(
          'div',
          { style: wrapperStyle },
          _react2.default.createElement(DATEPICKER, _extends({}, this.state.attributes, { errorText: this.state.errorText, onChange: this.onChange, onFocus: this.onFocus, onShow: this.onShow, onDismiss: this.onDismiss, onTouchTap: this.onTouchTap, formatDate: this.formatDate }))
        ),
        _react2.default.createElement(
          'div',
          { style: { display: 'inline-flex' } },
          _react2.default.createElement(_clear2.default, { color: _colors.grey700, style: closeStyle, onClick: this.clear }),
          this.props.attributes.tooltip && _react2.default.createElement(_TooltipComponent2.default, { tooltip: this.props.attributes.tooltip })
        )
      );
    }
  }]);

  return DatePicker;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? DatePicker.propTypes = {
  library: _propTypes2.default.object,
  component: _propTypes2.default.string.isRequired,
  attributes: _propTypes2.default.object,
  control: _propTypes2.default.object,
  option: _propTypes2.default.string.isRequired,
  rules: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  onTouchTap: _propTypes2.default.func,
  format: _propTypes2.default.string,
  wrapperStyle: _propTypes2.default.object,
  closeStyle: _propTypes2.default.object
} : void 0;
exports.default = DatePicker;