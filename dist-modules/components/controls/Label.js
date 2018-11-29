'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TooltipComponent = require('../TooltipComponent');

var _TooltipComponent2 = _interopRequireDefault(_TooltipComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Label Component */
var Label = function Label(props) {
  return _react2.default.createElement(
    'div',
    props.attributes,
    _react2.default.createElement(
      'div',
      { style: { display: 'flex' } },
      _react2.default.createElement(
        'span',
        null,
        props.attributes.text
      ),
      props.attributes.tooltip && _react2.default.createElement(_TooltipComponent2.default, { tooltip: props.attributes.tooltip })
    )
  );
};

process.env.NODE_ENV !== "production" ? Label.propTypes = {
  attributes: _react.PropTypes.object
} : void 0;
exports.default = Label;