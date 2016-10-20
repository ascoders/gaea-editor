"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require("react");
var typings = require("./background.type");
var mobx_react_1 = require("mobx-react");
var color_component_1 = require("../../utils/color/color.component");
require("./background.css");
var EditComponentBackground = function (_React$Component) {
    (0, _inherits3.default)(EditComponentBackground, _React$Component);

    function EditComponentBackground() {
        (0, _classCallCheck3.default)(this, EditComponentBackground);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentBackground.__proto__ || Object.getPrototypeOf(EditComponentBackground)).apply(this, arguments));

        _this.state = new typings.State();
        _this.colorChangeStatus = 'finish';
        return _this;
    }

    (0, _createClass3.default)(EditComponentBackground, [{
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
            if (this.colorChangeStatus === 'finish') {
                this.colorChangeStatus = 'start';
                this.props.viewport.prepareWriteHistory();
            }
            this.props.viewport.updateComponentValueWithNoHistory('style.backgroundColor', "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")");
        }
    }, {
        key: "handleColorChangeComplete",
        value: function handleColorChangeComplete(color) {
            this.colorChangeStatus = 'finish';
            this.props.viewport.writeHistory();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-background" }, React.createElement("div", { className: "row-container" }, React.createElement("i", { className: "fa fa-eyedropper icon-content" }), React.createElement(color_component_1.default, { onChange: this.handleColorChange.bind(this), onChangeComplete: this.handleColorChangeComplete.bind(this), color: this.componentInfo.props.style.backgroundColor || 'white' })));
        }
    }]);
    return EditComponentBackground;
}(React.Component);
EditComponentBackground.defaultProps = new typings.Props();
EditComponentBackground = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentBackground);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentBackground;