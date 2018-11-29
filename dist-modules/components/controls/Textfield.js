'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _validation = require('./../../helpers/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Textfield Component */
var TextField = function (_React$Component) {
  _inherits(TextField, _React$Component);

  function TextField(props) {
    _classCallCheck(this, TextField);

    var _this = _possibleConstructorReturn(this, (TextField.__proto__ || Object.getPrototypeOf(TextField)).call(this, props));

    _this.onChange = _this.onChange.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    _this.format = _this.format.bind(_this);
    _this.getFormattedValue = _this.getFormattedValue.bind(_this);

    _this.state = {
      errorText: props.attributes.errorText || '',
      value: _this.format(props.attributes.value) || ''
    };
    return _this;
  }

  _createClass(TextField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        errorText: props.attributes.errorText || '',
        value: this.format(props.attributes.value) || ''
      });
    }
  }, {
    key: 'format',
    value: function format(value) {
      var formattedValue = value;
      var formatter = this.props.formatter;
      var number = (0, _numeral2.default)(value).value() || 0;
      if (this.props.formatter && this.props.formatter.func && this.props.formatter.func.format) {
        formattedValue = number = (0, _numeral2.default)(number)[this.props.formatter.func.format.name](this.props.formatter.func.format.value).value();
      }
      if (formatter) {
        switch (formatter.type) {
          case 'number':
            formattedValue = (0, _numeral2.default)(number).format(formatter.expression);
            break;
          default:
            break;
        }
      }
      return formattedValue;
    }
  }, {
    key: 'unformat',
    value: function unformat(value) {
      var unformattedValue = value;
      var formatter = this.props.formatter;
      if (this.props.formatter && this.props.formatter.func && this.props.formatter.func.unformat) {
        unformattedValue = (0, _numeral2.default)(value)[this.props.formatter.func.unformat.name](this.props.formatter.func.unformat.value).value();
      }
      if (formatter) {
        switch (formatter.type) {
          case 'number':
            unformattedValue = (0, _numeral2.default)(unformattedValue).value();
            break;
          default:
            break;
        }
      }
      return unformattedValue;
    }
  }, {
    key: 'validate',
    value: function validate(value) {
      var isValid = true;
      if (this.props.rules && this.props.rules.validation) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.props.rules.validation[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var data = _step.value;

            isValid = _validation2.default[data.rule](value, data.value);
            if (!isValid) {
              return {
                isValid: false,
                message: data.message
              };
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
      return {
        isValid: true,
        message: ''
      };
    }
  }, {
    key: 'getFormattedValue',
    value: function getFormattedValue(val) {
      var formatter = this.props.formatter;
      var value = val;
      if (formatter) {
        switch (formatter.type) {
          case 'number':
            value = (0, _numeral2.default)(val).value();
            break;
          default:
            break;
        }
      }
      return value;
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.setState({
        value: args[0].target.value
      });
      var formattedValue = this.getFormattedValue(args[0].target.value);
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.props.control, args[0], formattedValue);
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var props = this.props;

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var validator = this.validate(this.format(args[0].target.value));
      var formattedValue = this.getFormattedValue(args[0].target.value);
      this.setState({
        value: this.format(args[0].target.value)
      });
      if (!validator.isValid) {
        this.setState({
          errorText: validator.message
        });
      } else {
        this.setState({
          errorText: ''
        });
      }
      if (typeof props.onBlur === 'function') {
        props.onBlur(this.props.control, args[0], formattedValue);
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var formattedValue = this.getFormattedValue(args[0].target.value);
      this.setState({
        value: this.unformat(args[0].target.value)
      });
      if (typeof this.props.onFocus === 'function') {
        this.props.onFocus(this.props.control, args[0], formattedValue);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var TEXTFIELD = props.library[props.component];
      return _react2.default.createElement(TEXTFIELD, _extends({}, props.attributes, { value: this.state.value, errorText: this.state.errorText, onChange: this.onChange, onBlur: this.onBlur, onFocus: this.onFocus }));
    }
  }]);

  return TextField;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? TextField.propTypes = {
  library: _react.PropTypes.object,
  component: _react.PropTypes.string.isRequired,
  attributes: _react.PropTypes.object,
  control: _react.PropTypes.object,
  option: _react.PropTypes.string.isRequired,
  rules: _react.PropTypes.object,
  formatter: _react.PropTypes.object,
  onChange: _react.PropTypes.func,
  onFocus: _react.PropTypes.func,
  onBlur: _react.PropTypes.func
} : void 0;
exports.default = TextField;