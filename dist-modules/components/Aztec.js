'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CurrentFormResponseDataByGuid = exports.ClearAllAztec = exports.ClearAztecByGuid = exports.Aztec = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _reactFlexboxGrid = require('react-flexbox-grid');

var _DynamicComponent = require('./DynamicComponent');

var _filter = require('./../helpers/filter');

var _mui = require('./../config/mui');

var _mui2 = _interopRequireDefault(_mui);

var _validation = require('./../helpers/validation');

var _validation2 = _interopRequireDefault(_validation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LIBMap = {
  MUI: {
    map: _mui2.default
  }
};

var response = {};

var getFieldValue = function getFieldValue() {
  var a = arguments.length <= 0 ? undefined : arguments[0];
  var type = a.type;
  var value = null;
  switch (type) {
    case 'textfield':
      value = arguments.length <= 2 ? undefined : arguments[2];
      break;
    case 'selectfield':
      value = arguments.length <= 3 ? undefined : arguments[3];
      break;
    case 'toggle':
      value = arguments.length <= 2 ? undefined : arguments[2];
      break;
    case 'autocomplete':
      value = arguments.length <= 1 ? undefined : arguments[1];
      break;
    case 'datepicker':
      value = arguments.length <= 2 ? undefined : arguments[2];
      break;
    case 'timepicker':
      value = arguments.length <= 2 ? undefined : arguments[2];
      break;
    case 'radio':
      value = arguments.length <= 2 ? undefined : arguments[2];
      break;
    case 'checkbox':
      value = arguments.length <= 2 ? undefined : arguments[2];
      break;
    default:
      value = '';
  }
  return value;
};

var getAllMandatoryFields = function getAllMandatoryFields(fields) {
  var mandatoryFields = [];
  _lodash2.default.each(fields, function (field) {
    if (field.rules) {
      var isMandatory = _lodash2.default.find(field.rules.validation, { rule: 'mandatory' });
      if (isMandatory) {
        mandatoryFields.push(field);
      }
    }
  });
  return mandatoryFields;
};

var getInitialValues = function getInitialValues(fields) {
  var data = {};
  _lodash2.default.each(fields, function (field) {
    if (field.props.value === undefined) {
      data[field.id] = '';
    } else {
      data[field.id] = field.props.value;
    }
  });
  return data;
};

var handleData = function handleData(guid) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var val = getFieldValue.apply(undefined, args);
  response[guid][args[0].id] = val;
};

var updateResponse = function updateResponse(fields, patch, guid) {
  _lodash2.default.each(fields, function (field) {
    if (response[guid][field.id] === '' || response[guid][field.id] === undefined) {
      response[guid][field.id] = field.props.value || field.props.defaultSelected || field.props.defaultChecked || field.props.defaultToggled || field.props.selected || '';
    } else {
      response[guid][field.id] = response[guid][field.id];
    }
    if (patch && patch[field.id] !== undefined) {
      // Patch update data
      response[guid][field.id] = patch[field.id];
    }
  });
};

var getCurrentFormData = function getCurrentFormData(fields, errors, guid) {
  var formData = Object.assign([], fields);
  _lodash2.default.map(formData, function (field) {
    if (field.type === 'selectfield') {
      field.props.selected = response[guid][field.id];
    } else {
      field.props.value = response[guid][field.id];
    }
    var error = _lodash2.default.find(errors, {
      id: field.id
    });
    if (error) {
      field.props.errorText = error.message;
    } else {
      field.props.errorText = '';
    }
  });
  return formData;
};

var getErrors = function getErrors(fields, guid) {
  var mandatoryFields = getAllMandatoryFields(fields);
  var errors = [];
  _lodash2.default.each(mandatoryFields, function (field, index) {
    _lodash2.default.each(field.rules.validation, function (rule) {
      var isClean = _validation2.default[rule.rule](response[guid][field.id].toString(), rule.value);
      if (!isClean) {
        var error = Object.assign({}, rule, {
          id: field.id
        });
        errors.push(error);
      }
    });
  });
  return errors;
};

var handleSubmit = function handleSubmit(callback, data, guid) {
  var fields = data;
  var errors = getErrors(data, guid);
  if (typeof callback === 'function') {
    var currentFormData = getCurrentFormData(fields, errors, guid);
    updateResponse(fields, null, guid);
    callback(response, errors, currentFormData);
  }
};

/** Aztec */
var Aztec = exports.Aztec = function Aztec(props) {
  window.scrollTo(0, 0);
  var config = LIBMap.MUI;
  var data = props.data;
  if (!props.forceUpdate) {
    var errors = [];
    if (props.displayErrors) {
      errors = getErrors(props.data, props.guid);
    }
    response[props.guid] = response[props.guid] || {};
    updateResponse(props.data, props.patch, props.guid);
    data = getCurrentFormData(props.data, errors, props.guid);
  } else {
    response[props.guid] = response[props.guid] || {};
    response[props.guid] = getInitialValues(data);
  }
  var layout = (0, _filter.generateLayout)(data);
  config.modules = props.library;
  return _react2.default.createElement(
    'div',
    null,
    layout.wrows.map(function (row, i) {
      return _react2.default.createElement(
        _reactFlexboxGrid.Row,
        { key: i },
        row.map(function (field, index) {
          return _react2.default.createElement(
            _reactFlexboxGrid.Col,
            { xs: field.layout.xs ? field.layout.xs.col : '', sm: field.layout.sm ? field.layout.sm.col : '', md: field.layout.md ? field.layout.md.col : '', lg: field.layout.lg ? field.layout.lg.col : '', style: field.style, className: field.className + ' ' + (field.visible === false ? 'hidden' : 'show'), key: index },
            _react2.default.createElement(_DynamicComponent.DynamicComponent, {
              component: config.map[field.type].type,
              map: config.map[field.type].map,
              option: config.map[field.type].options ? config.map[field.type].options.type : '',
              control: field,
              library: config.modules,
              attributes: field.props,
              rules: field.rules,
              formatter: field.formatter,
              onChange: function onChange() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = arguments[_key2];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onChange === 'function') {
                  props.onChange.apply(props, args);
                }
              },
              onBlur: props.onBlur,
              onFocus: props.onFocus,
              onCheck: function onCheck() {
                for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = arguments[_key3];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onCheck === 'function') {
                  props.onCheck.apply(props, args);
                }
              },
              onToggle: function onToggle() {
                for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                  args[_key4] = arguments[_key4];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onToggle === 'function') {
                  props.onToggle.apply(props, args);
                }
              },
              onShow: props.onShow,
              onDismiss: props.onDismiss,
              onTouchTap: props.onTouchTap,
              onUpdateInput: function onUpdateInput() {
                for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                  args[_key5] = arguments[_key5];
                }

                handleData.apply(undefined, [props.guid].concat(args));
                if (typeof props.onUpdateInput === 'function') {
                  props.onUpdateInput.apply(props, args);
                }
              },
              onNewRequest: props.onNewRequest,
              filter: props.filter
            })
          );
        })
      );
    }),
    layout.worows.map(function (field, index) {
      return _react2.default.createElement(
        'div',
        { key: index, style: field.style, className: field.className + ' ' + (field.visible === false ? 'hidden' : 'show') },
        _react2.default.createElement(_DynamicComponent.DynamicComponent, {
          component: config.map[field.type].type,
          map: config.map[field.type].map,
          option: config.map[field.type].options ? config.map[field.type].options.type : '',
          control: field,
          library: config.modules,
          attributes: field.props,
          rules: field.rules,
          formatter: field.formatter,
          fetchResponse: props.fetchResponse,
          onChange: function onChange() {
            for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onChange === 'function') {
              props.onChange.apply(props, args);
            }
          },
          onBlur: props.onBlur,
          onFocus: props.onFocus,
          onCheck: function onCheck() {
            for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
              args[_key7] = arguments[_key7];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onCheck === 'function') {
              props.onCheck.apply(props, args);
            }
          },
          onToggle: function onToggle() {
            for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
              args[_key8] = arguments[_key8];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onToggle === 'function') {
              props.onToggle.apply(props, args);
            }
          },
          onShow: props.onShow,
          onDismiss: props.onDismiss,
          onTouchTap: props.onTouchTap,
          onUpdateInput: function onUpdateInput() {
            for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
              args[_key9] = arguments[_key9];
            }

            handleData.apply(undefined, [props.guid].concat(args));
            if (typeof props.onUpdateInput === 'function') {
              props.onUpdateInput.apply(props, args);
            }
          },
          onNewRequest: props.onNewRequest,
          filter: props.filter
        })
      );
    }),
    _react2.default.createElement('button', {
      ref: props.formRef,
      onClick: function onClick() {
        handleSubmit(props.onSubmit, data, props.guid);
      },
      style: {
        display: 'none'
      }
    })
  );
};

var ClearAztecByGuid = exports.ClearAztecByGuid = function ClearAztecByGuid() {
  var guid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  if (guid) {
    delete response[guid];
  }
};

var ClearAllAztec = exports.ClearAllAztec = function ClearAllAztec() {
  var except = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  _lodash2.default.map(Object.keys(response), function (k) {
    if (except.indexOf(k) === -1) {
      delete response[k];
    }
  });
};

var CurrentFormResponseDataByGuid = exports.CurrentFormResponseDataByGuid = function CurrentFormResponseDataByGuid(guid) {
  if (!response[guid]) {
    return '';
  }
  return response[guid];
};

process.env.NODE_ENV !== "production" ? Aztec.propTypes = {
  data: _propTypes2.default.array.isRequired,
  library: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onTouchTap: _propTypes2.default.func,
  onCheck: _propTypes2.default.func,
  onToggle: _propTypes2.default.func,
  onShow: _propTypes2.default.func,
  onDismiss: _propTypes2.default.func,
  onUpdateInput: _propTypes2.default.func,
  onNewRequest: _propTypes2.default.func,
  filter: _propTypes2.default.func,
  response: _propTypes2.default.object,
  onSubmit: _propTypes2.default.func,
  formRef: _propTypes2.default.func,
  forceUpdate: _propTypes2.default.bool,
  displayErrors: _propTypes2.default.bool,
  patch: _propTypes2.default.object,
  guid: _propTypes2.default.string.isRequired
} : void 0;
exports.default = { Aztec: Aztec, ClearAztecByGuid: ClearAztecByGuid, ClearAllAztec: ClearAllAztec, CurrentFormResponseDataByGuid: CurrentFormResponseDataByGuid };
// export default Aztec;