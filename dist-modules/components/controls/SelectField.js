'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validation = require('./../../helpers/validation');

var _validation2 = _interopRequireDefault(_validation);

var _TooltipComponent = require('../TooltipComponent');

var _TooltipComponent2 = _interopRequireDefault(_TooltipComponent);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _map = require('lodash/map');

var _map2 = _interopRequireDefault(_map);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _multiSelectCustomControl = require('../multiSelectCustomControl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** SelectField Component */
var SelectField = function (_React$Component) {
  _inherits(SelectField, _React$Component);

  function SelectField(props) {
    _classCallCheck(this, SelectField);

    var _this = _possibleConstructorReturn(this, (SelectField.__proto__ || Object.getPrototypeOf(SelectField)).call(this, props));

    _this.state = {
      value: props.attributes.selected,
      errorText: props.attributes.errorText || '',
      selectedOption: _this.getProperValueForReactSelect()
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.selectionRenderer = _this.selectionRenderer.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    return _this;
  }

  _createClass(SelectField, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.state = {
        value: props.attributes.selected,
        errorText: props.attributes.errorText || '',
        selectedOption: this.getProperValueForReactSelect()
      };
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
    key: 'onChange',
    value: function onChange() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var validator = this.validate(args[2]);
      if (!validator.isValid) {
        this.setState({
          errorText: validator.message,
          value: args[2]
        });
      } else {
        this.setState({
          errorText: '',
          value: args[2]
        });
      }
      if (typeof this.props.onChange === 'function') {
        var _props;

        (_props = this.props).onChange.apply(_props, [this.props.control].concat(args));
      }
    }
  }, {
    key: 'menuItemsDetails',
    value: function menuItemsDetails(values) {
      return this.props.control.options.map(function (d, value) {
        return _react2.default.createElement(_MenuItem2.default, {
          key: d.primaryText,
          insetChildren: true,
          checked: values && values.indexOf(d.value) > -1,
          value: d.value,
          primaryText: d.primaryText
        });
      });
    }
  }, {
    key: 'selectionRenderer',
    value: function selectionRenderer(values) {
      if (!this.props.attributes.multiple) {
        return this.getProperData(values);
      }
      switch (values.length) {
        case 0:
          return '';
        case 1:
          return this.getProperData(values[0]);
        default:
          return this.props.control.props.floatingLabelText ? values.length + ' ' + this.props.control.props.floatingLabelText.toLowerCase() + ' selected' : values.length + ' items selected';
      }
    }
  }, {
    key: 'getProperData',
    value: function getProperData(value) {
      var b = this.props.control.options.find(function (a) {
        return value && a.value && a.value === value;
      });
      return b && b.primaryText || '';
    }
  }, {
    key: 'handleChange',
    value: function handleChange(selectedOption) {
      this.setState({ selectedOption: selectedOption });
      // console.log('Option selected:', selectedOption);
      if (typeof this.props.onChange === 'function') {
        this.props.onChange(this.props.control, '', '', (0, _map2.default)(selectedOption, 'label'));
      }
    }
  }, {
    key: 'getProperValueForReactSelect',
    value: function getProperValueForReactSelect() {
      var selectedOption = [];
      var options = this.props.control.options;
      var o = this.props.attributes.selected || this.props.attributes.value;
      (0, _map2.default)(o, function (value) {
        var f = (0, _find2.default)(options, { value: value });
        f && selectedOption.push({ value: f.value, label: f.primaryText || f.label || '' });
      });
      return selectedOption;
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var SELECTFIELD = this.props.library[props.component];
      var OPTION = this.props.library[props.option];
      var _state = this.state,
          selectedOption = _state.selectedOption,
          value = _state.value;

      return _react2.default.createElement(
        'div',
        { style: { display: 'flex' } },
        props.attributes.isMulti ? _react2.default.createElement(
          'div',
          { style: Object.assign({}, { width: '120%', marginTop: '25px', marginRight: '5px', zIndex: 2, maxWidth: '100%' }, props.attributes.style) },
          _react2.default.createElement(_reactSelect2.default, _extends({ components: props.attributes.enablefloatingLabel ? { Control: _multiSelectCustomControl.ControlComponent } : null, value: selectedOption, onChange: this.handleChange, isMulti: true }, props.attributes, { options: props.control.options.map(function (option) {
              return { value: option.value, label: option.primaryText || option.label || '' };
            }) }))
        ) : _react2.default.createElement(
          SELECTFIELD,
          _extends({}, props.attributes, { value: this.state.value, errorText: this.state.errorText, onChange: this.onChange, selectionRenderer: this.selectionRenderer }),
          props.attributes.multiple ? this.menuItemsDetails(value) : this.props.control.options.map(function (option, index) {
            return _react2.default.createElement(OPTION, _extends({}, option, { key: index }));
          })
        ),
        this.props.attributes.tooltip && _react2.default.createElement(_TooltipComponent2.default, { tooltip: this.props.attributes.tooltip })
      );
    }
  }]);

  return SelectField;
}(_react2.default.Component);

process.env.NODE_ENV !== "production" ? SelectField.propTypes = {
  library: _react.PropTypes.object,
  component: _react.PropTypes.string.isRequired,
  attributes: _react.PropTypes.object,
  control: _react.PropTypes.object,
  option: _react.PropTypes.string.isRequired,
  rules: _react.PropTypes.object,
  onChange: _react.PropTypes.func
} : void 0;
exports.default = SelectField;