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

var _TooltipComponent = require('../TooltipComponent');

var _TooltipComponent2 = _interopRequireDefault(_TooltipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Toggle Component */
var Toggle = function (_React$Component) {
  _inherits(Toggle, _React$Component);

  function Toggle(props) {
    _classCallCheck(this, Toggle);

    var _this = _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).call(this, props));

    _this.onToggle = _this.onToggle.bind(_this);
    return _this;
  }

  _createClass(Toggle, [{
    key: 'onToggle',
    value: function onToggle() {
      if (typeof this.props.onToggle === 'function') {
        var _props;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        (_props = this.props).onToggle.apply(_props, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var TOGGLE = props.library[props.component];
      return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        _react2.default.createElement(TOGGLE, _extends({}, props.attributes, { onToggle: this.onToggle })),
        this.props.attributes.tooltip && _react2.default.createElement(_TooltipComponent2.default, { tooltip: this.props.attributes.tooltip })
      );
    }
  }]);

  return Toggle;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? Toggle.propTypes = {
  library: _propTypes2.default.object,
  component: _propTypes2.default.string.isRequired,
  attributes: _propTypes2.default.object,
  control: _propTypes2.default.object,
  rules: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
} : void 0;
exports.default = Toggle;