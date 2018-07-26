'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DynamicComponent = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./controls/index');

var Controls = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicComponent = exports.DynamicComponent = function DynamicComponent(props) {
  var CustomComponent = Controls.default[props.map];
  return _react2.default.createElement(CustomComponent, props);
};

process.env.NODE_ENV !== "production" ? DynamicComponent.propTypes = {
  map: _react.PropTypes.string.isRequired
} : void 0;

exports.default = DynamicComponent;