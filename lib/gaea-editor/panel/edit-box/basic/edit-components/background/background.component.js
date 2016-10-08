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
var React = require('react');
var typings = require('./background.type');
var mobx_react_1 = require('mobx-react');
var react_color_1 = require('react-color');
require('./background.css');
var EditComponentBackground = function (_React$Component) {
    _inherits(EditComponentBackground, _React$Component);

    function EditComponentBackground() {
        var _ref;

        _classCallCheck(this, EditComponentBackground);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditComponentBackground.__proto__ || Object.getPrototypeOf(EditComponentBackground)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentBackground, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            this.init(this.props);
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            this.init(nextProps);
        }
    }, {
        key: "init",
        value: function init(props) {}
    }, {
        key: "handleColorPickerClick",
        value: function handleColorPickerClick() {
            this.setState({
                displayColorPicker: !this.state.displayColorPicker
            });
        }
    }, {
        key: "handleClose",
        value: function handleClose() {
            this.setState({
                displayColorPicker: false
            });
        }
    }, {
        key: "handleColorChange",
        value: function handleColorChange(color) {
            this.props.viewport.prepareWriteHistory();
            this.props.viewport.updateComponentValueWithNoHistory('style.backgroundColor', "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")");
        }
    }, {
        key: "handleColorChangeComplete",
        value: function handleColorChangeComplete(color) {
            this.props.viewport.updateComponentValueWithNoHistory('style.backgroundColor', "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")");
            this.props.viewport.writeHistory();
        }
    }, {
        key: "render",
        value: function render() {
            var shadow = {
                position: 'absolute',
                left: -1000,
                top: -1000,
                width: 10000,
                height: 10000,
                zIndex: 99
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-background" }, React.createElement("div", { className: "row-container" }, React.createElement("i", { className: "fa fa-eyedropper icon-content" }), React.createElement("div", { className: "color-picker-container" }, React.createElement("div", { className: "color-picker-label-container", onClick: this.handleColorPickerClick.bind(this) }, React.createElement("div", { className: "color-picker-label", style: { backgroundColor: this.componentInfo.props.style.backgroundColor } })), this.state.displayColorPicker && React.createElement("div", null, React.createElement("div", { style: shadow, onClick: this.handleClose.bind(this) }), React.createElement("div", { className: "picker-container" }, React.createElement(react_color_1.ChromePicker, { label: "hex", onChange: this.handleColorChange.bind(this), onChangeComplete: this.handleColorChangeComplete.bind(this), color: this.componentInfo.props.style.backgroundColor || 'transparent' }))))));
        }
    }]);

    return EditComponentBackground;
}(React.Component);
EditComponentBackground.defaultProps = new typings.Props();
EditComponentBackground = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentBackground);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentBackground;