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
var typings = require("./set-group-button.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-input');
require("./set-group-button.css");
var SetGroupButton = function (_React$Component) {
    (0, _inherits3.default)(SetGroupButton, _React$Component);

    function SetGroupButton() {
        (0, _classCallCheck3.default)(this, SetGroupButton);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SetGroupButton.__proto__ || Object.getPrototypeOf(SetGroupButton)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(SetGroupButton, [{
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            var fullInfo = this.props.viewport.getComponentFullInfoByMapUniqueKey(this.props.viewport.currentEditComponentMapUniqueKey);
            this.props.application.addComboComponent({
                name: this.state.name,
                mapUniqueKey: fullInfo.mapUniqueKey,
                componentInfo: fullInfo.componentInfo,
                childs: fullInfo.childs
            });
            this.setState({
                show: false,
                name: ''
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false,
                name: ''
            });
        }
    }, {
        key: "handleChangeName",
        value: function handleChangeName(value) {
            this.setState({
                name: value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(index_2.default, { onClick: this.handleShowModal.bind(this) }, "设为组合", React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-set_group_button", show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this) }, React.createElement(index_3.default, { onChange: this.handleChangeName.bind(this), label: "输入组名" }), React.createElement("p", { className: "description" }, "设为组合的元素,会在右侧『组件』栏中『组合』选项中出现.")));
        }
    }]);
    return SetGroupButton;
}(React.Component);
SetGroupButton.defaultProps = new typings.Props();
SetGroupButton = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], SetGroupButton);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetGroupButton;