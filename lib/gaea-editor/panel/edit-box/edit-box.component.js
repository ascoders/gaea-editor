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
var ReactDOM = require("react-dom");
var typings = require("./edit-box.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-tabs');
var basic_component_1 = require("./basic/basic.component");
var event_component_1 = require("./event/event.component");
require("./edit-box.css");
var EditBox = function (_React$Component) {
    (0, _inherits3.default)(EditBox, _React$Component);

    function EditBox() {
        (0, _classCallCheck3.default)(this, EditBox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditBox.__proto__ || Object.getPrototypeOf(EditBox)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditBox, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.domInstance = ReactDOM.findDOMNode(this);
        }
    }, {
        key: "handleCloseClick",
        value: function handleCloseClick() {
            this.props.viewport.cancelEditComponent();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.viewport.currentEditComponentMapUniqueKey === null) {
                return null;
            }
            var itemStyle = {
                height: "calc(100% - " + this.props.application.footerHeight + "px)",
                flexGrow: 0
            };
            var basicTabName = this.props.viewport.currentEditPropsIndex === null ? '基础' : '新的属性';
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box container-box" }, React.createElement("span", { className: "handle-drag-close", onClick: this.handleCloseClick }, "x"), React.createElement(index_2.Tabs, { defaultActiveKey: "basic", type: "retro", className: "edit-box-handle" }, React.createElement(index_2.TabPanel, { tab: basicTabName, style: itemStyle, activeKey: "basic", className: "edit-container" }, React.createElement(basic_component_1.default, null)), React.createElement(index_2.TabPanel, { tab: "事件", style: itemStyle, activeKey: "event", className: "edit-container" }, React.createElement(event_component_1.default, null))));
        }
    }]);
    return EditBox;
}(React.Component);
EditBox.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], EditBox.prototype, "handleCloseClick", null);
EditBox = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], EditBox);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBox;