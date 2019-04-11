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

var _validation = require('./../../helpers/validation');

var _validation2 = _interopRequireDefault(_validation);

var _TooltipComponent = require('../TooltipComponent');

var _TooltipComponent2 = _interopRequireDefault(_TooltipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** AutoComplete Component */
var AutoComplete = function (_React$Component) {
  _inherits(AutoComplete, _React$Component);

  function AutoComplete(props) {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, (AutoComplete.__proto__ || Object.getPrototypeOf(AutoComplete)).call(this, props));

    _this.state = {
      errorText: props.attributes.errorText || '',
      value: props.attributes.value || ''
    };
    _this.onUpdateInput = _this.onUpdateInput.bind(_this);
    _this.onNewRequest = _this.onNewRequest.bind(_this);
    _this.filter = _this.filter.bind(_this);
    _this.onBlur = _this.onBlur.bind(_this);
    _this.onFocus = _this.onFocus.bind(_this);
    return _this;
  }

  _createClass(AutoComplete, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setState({
        errorText: props.attributes.errorText || '',
        value: props.attributes.value || ''
      });
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
    key: 'filter',
    value: function filter() {
      if (typeof this.props.filter === 'function') {
        var _props;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_props = this.props).filter.apply(_props, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'onUpdateInput',
    value: function onUpdateInput() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this.setState({
        value: args[0]
      });
      if (typeof this.props.onUpdateInput === 'function') {
        var _props2;

        (_props2 = this.props).onUpdateInput.apply(_props2, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'onNewRequest',
    value: function onNewRequest() {
      if (typeof this.props.onNewRequest === 'function') {
        var _props3;

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        (_props3 = this.props).onNewRequest.apply(_props3, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var props = this.props;

      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var validator = this.validate(args[0].target.value);
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
        props.onBlur.apply(props, [props.control].concat(args));
      }
    }
  }, {
    key: 'onFocus',
    value: function onFocus() {
      if (typeof this.props.onFocus === 'function') {
        var _props4;

        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
          args[_key5] = arguments[_key5];
        }

        (_props4 = this.props).onFocus.apply(_props4, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var AUTOCOMPLETE = props.library[props.component];
      var filter = typeof this.props.filter === 'function' ? this.props.filter : AUTOCOMPLETE[props.attributes.filter];
      return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        _react2.default.createElement(AUTOCOMPLETE, _extends({}, props.attributes, { value: this.state.value, filter: filter, errorText: this.state.errorText, onBlur: this.onBlur, onFocus: this.onFocus, onUpdateInput: this.onUpdateInput, onNewRequest: this.onNewRequest })),
        this.props.attributes.tooltip && _react2.default.createElement(_TooltipComponent2.default, { tooltip: this.props.attributes.tooltip })
      );
    }
  }]);

  return AutoComplete;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? AutoComplete.propTypes = {
  library: _propTypes2.default.object,
  component: _propTypes2.default.string.isRequired,
  attributes: _propTypes2.default.object,
  control: _propTypes2.default.object,
  option: _propTypes2.default.string.isRequired,
  rules: _propTypes2.default.object,
  onUpdateInput: _propTypes2.default.func,
  onNewRequest: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  filter: _propTypes2.default.func
} : void 0;
exports.default = AutoComplete;