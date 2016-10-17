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
var React = require("react");
var typings = require("./switch.type");
var mobx_react_1 = require("mobx-react");
require("./switch.css");
var index_1 = require('nt-web-switch');
var EditComponentSwitch = function (_React$Component) {
    _inherits(EditComponentSwitch, _React$Component);

    function EditComponentSwitch() {
        _classCallCheck(this, EditComponentSwitch);

        var _this = _possibleConstructorReturn(this, (EditComponentSwitch.__proto__ || Object.getPrototypeOf(EditComponentSwitch)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentSwitch, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            var switchOpts = {
                disabled: !this.props.editOption.editable,
                checked: Boolean(this.props.viewport.getPropsByFieldWithEditor(this.componentInfo.props, this.props.editOption)),
                onChange: function onChange(checked) {
                    _this2.props.viewport.updateComponentOptionsValue(_this2.props.editOption, checked);
                }
            };
            return React.createElement(index_1.default, __assign({}, switchOpts));
        }
    }]);

    return EditComponentSwitch;
}(React.Component);
EditComponentSwitch.defaultProps = new typings.Props();
EditComponentSwitch = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentSwitch);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentSwitch;