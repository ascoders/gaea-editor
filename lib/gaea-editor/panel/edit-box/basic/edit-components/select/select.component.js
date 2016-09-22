"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __assign = undefined && undefined.__assign || Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
    }
    return t;
};
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var typings = require('./select.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-web-select');
var EditComponentSelect = function (_React$Component) {
    _inherits(EditComponentSelect, _React$Component);

    function EditComponentSelect() {
        var _ref;

        _classCallCheck(this, EditComponentSelect);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditComponentSelect.__proto__ || Object.getPrototypeOf(EditComponentSelect)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentSelect, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            var selectorOpts = {
                label: this.props.editOption.label,
                disabled: !this.props.editOption.editable || this.props.editOption.isNull,
                defaultValue: this.props.editOption.isNull ? this.props.editOption.notNullValue : this.componentInfo.props[this.props.editOption.field],
                options: this.props.editOption.selector,
                onChange: function onChange(value) {
                    _this2.props.viewport.updateComponentOptionsValue(_this2.props.editOption, value);
                }
            };
            return React.createElement(index_1.Select, __assign({}, selectorOpts));
        }
    }]);

    return EditComponentSelect;
}(React.Component);
EditComponentSelect.defaultProps = new typings.Props();
EditComponentSelect = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentSelect);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentSelect;
//# sourceMappingURL=select.component.js.map