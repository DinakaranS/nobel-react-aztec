'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Textfield = require('./Textfield');

var _Textfield2 = _interopRequireDefault(_Textfield);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _SelectField = require('./SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TimePicker = require('./TimePicker');

var _TimePicker2 = _interopRequireDefault(_TimePicker);

var _AutoComplete = require('./AutoComplete');

var _AutoComplete2 = _interopRequireDefault(_AutoComplete);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Controls = {
  TextField: _Textfield2.default,
  Radio: _Radio2.default,
  SelectField: _SelectField2.default,
  Checkbox: _Checkbox2.default,
  Toggle: _Toggle2.default,
  DatePicker: _DatePicker2.default,
  TimePicker: _TimePicker2.default,
  AutoComplete: _AutoComplete2.default,
  Label: _Label2.default
};

exports.default = Controls;