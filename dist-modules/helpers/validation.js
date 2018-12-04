'use strict';

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var validation = {
  email: function email(value, options) {
    return _validator2.default.isEmail(value, options);
  },
  equals: function equals(value, comparison) {
    return _validator2.default.equals(value, comparison);
  },
  mandatory: function mandatory(value) {
    return !_validator2.default.isEmpty(value);
  },
  mandatoryselect: function mandatoryselect(value) {
    return value.length > 0;
  },
  mobile: function mobile(value, locale) {
    return _validator2.default.isMobilePhone(value, locale);
  },
  lowercase: function lowercase(value) {
    return _validator2.default.isLowercase(value);
  },
  uppercase: function uppercase(value) {
    return _validator2.default.isUppercase(value);
  },
  length: function length(value, options) {
    return _validator2.default.isLength(value, options);
  },
  url: function url(value, options) {
    return _validator2.default.isURL(value, options);
  },
  creditcard: function creditcard(value) {
    return _validator2.default.isCreditCard(value);
  },
  currency: function currency(value, options) {
    return _validator2.default.isCurrency(value, options);
  },
  date: function date(value) {
    return _validator2.default.isDate(value);
  },
  boolean: function boolean(value) {
    return _validator2.default.isBoolean(value);
  },
  alphanumeric: function alphanumeric(value, locale) {
    _validator2.default.isAlphanumeric(value, locale);
  },
  contains: function contains(value, seed) {
    return _validator2.default.contains(value, seed);
  },
  FQDN: function FQDN(value, options) {
    return _validator2.default.isFQDN(value, options);
  },
  float: function float(value, options) {
    return _validator2.default.isFloat(value, options);
  },
  ip: function ip(value, version) {
    return _validator2.default.isIP(value, version);
  },
  ISBN: function ISBN(value, version) {
    return _validator2.default.isISBN(value, version);
  },
  MACAddress: function MACAddress(value) {
    return _validator2.default.isMACAddress(value);
  },
  MD5: function MD5(value) {
    return _validator2.default.isMD5(value);
  },
  numeric: function numeric(value) {
    return _validator2.default.isNumeric(value);
  },
  UUID: function UUID(value, version) {
    return _validator2.default.isUUID(value, version);
  },
  matches: function matches(value, pattern) {
    return _validator2.default.matches(value, pattern);
  },
  int: function int(value, options) {
    return _validator2.default.isInt(value, options);
  },
  hexcolor: function hexcolor(value) {
    return _validator2.default.isHexColor(value);
  },
  dataURI: function dataURI(value) {
    return _validator2.default.isDataURI(value);
  },
  decimal: function decimal(value) {
    return _validator2.default.isDecimal(value);
  },
  alpha: function alpha(value, locale) {
    return _validator2.default.isAlpha(value);
  },
  negative: function negative(value) {
    return (0, _numeral2.default)(value).value() > -1;
  }
};

module.exports = validation;