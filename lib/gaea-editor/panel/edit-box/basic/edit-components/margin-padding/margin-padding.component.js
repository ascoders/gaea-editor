"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var typings = require("./margin-padding.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-margin-padding-editor');
require("./margin-padding.css");
var EditComponentText = function (_React$Component) {
    _inherits(EditComponentText, _React$Component);

    function EditComponentText() {
        _classCallCheck(this, EditComponentText);

        var _this = _possibleConstructorReturn(this, (EditComponentText.__proto__ || Object.getPrototypeOf(EditComponentText)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentText, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleStart",
        value: function handleStart() {
            this.props.viewport.prepareWriteHistory();
        }
    }, {
        key: "handleChange",
        value: function handleChange(name, value) {
            this.props.viewport.updateComponentValueWithNoHistory("style." + name, value);
        }
    }, {
        key: "handleFinalChange",
        value: function handleFinalChange(name, value) {
            this.props.viewport.updateComponentValueWithNoHistory("style." + name, value);
            this.props.viewport.writeHistory();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-margin_padding" }, React.createElement(index_1.default, { size: 220, onStart: this.handleStart.bind(this), marginLeft: this.componentInfo.props.style.marginLeft, marginTop: this.componentInfo.props.style.marginTop, marginRight: this.componentInfo.props.style.marginRight, marginBottom: this.componentInfo.props.style.marginBottom, paddingLeft: this.componentInfo.props.style.paddingLeft, paddingTop: this.componentInfo.props.style.paddingTop, paddingRight: this.componentInfo.props.style.paddingRight, paddingBottom: this.componentInfo.props.style.paddingBottom, onChange: this.handleChange.bind(this), onFinalChange: this.handleFinalChange.bind(this) }));
        }
    }]);

    return EditComponentText;
}(React.Component);
EditComponentText.defaultProps = new typings.Props();
EditComponentText = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentText);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentText;