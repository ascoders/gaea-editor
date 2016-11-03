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
var typings = require("./helper.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-tabs');
var index_4 = require('nt-auto-bind');
require("./helper.css");
var Helper = function (_React$Component) {
    (0, _inherits3.default)(Helper, _React$Component);

    function Helper() {
        (0, _classCallCheck3.default)(this, Helper);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Helper.__proto__ || Object.getPrototypeOf(Helper)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Helper, [{
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false
            });
        }
    }, {
        key: "renderOperateButton",
        value: function renderOperateButton(triggerOk, triggerCancel) {
            return React.createElement("div", null, React.createElement(index_2.default, { onClick: triggerOk }, "我知道了"));
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "menu-item", onClick: this.handleShowModal }, "帮助", React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header-helper" }, React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-page-header-helper", title: "帮助", size: "large", renderOperateButton: this.renderOperateButton, show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this) }, React.createElement(index_3.Tabs, { defaultActiveKey: "1" }, React.createElement(index_3.TabPanel, { tab: "基本操作", activeKey: "1", className: "container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "拖拽"), React.createElement("div", { className: "helper-description" }, "右侧菜单可拖拽组件到视图中，视图中也可拖拽排序")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/9a504fc2d562853513ca6ecd98ef76c6a7ef6330.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "编辑"), React.createElement("div", { className: "helper-description" }, "点击视图中组件开启编辑菜单，修改菜单中选项组件会实时更新")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/d439b6003af33a872284bff6ce5c10385243b575.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "删除"), React.createElement("div", { className: "helper-description" }, "编辑菜单右上角有删除按钮")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/8c1001e93901213f51f7f7305ce736d12e2e9512.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "修改视图尺寸"), React.createElement("div", { className: "helper-description" }, "菜单可以调节视图宽度")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/6d81800a19d8bc3ea9f3be268a8ba61ea9d34566.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "撤销/重做"), React.createElement("div", { className: "helper-description" }, "菜单可以回撤、重做修改操作")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/f636afc379310a55d6b16618bf4543a983261040.jpg" })))), React.createElement(index_3.TabPanel, { tab: "快捷键", activeKey: "2", className: "container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "撤销/重做"), React.createElement("div", { className: "helper-description" }, React.createElement("p", null, "撤销：ctrl/cmd + z"), React.createElement("p", { style: { marginTop: 10 } }, "重做：ctrl/cmd + shift + z"))), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/c8177f3e6709c93d0f810c1a973df8dcd00054ef.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "保存"), React.createElement("div", { className: "helper-description" }, React.createElement("p", null, "ctrl/cmd + s"))), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/e1fe9925bc315c60687c690285b1cb1348547775.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "复制/粘贴"), React.createElement("div", { className: "helper-description" }, React.createElement("p", null, "复制：ctrl/cmd + c"), React.createElement("p", { style: { marginTop: 10 } }, "粘贴：ctrl/cmd + v"), React.createElement("p", { style: { marginTop: 10 } }, "注意，复制的是鼠标所在位置的元素，粘贴也会粘贴到鼠标所在位置的元素中"))), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/b3fb43166d224f4ada7971fe01f790529922d17f.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "删除"), React.createElement("div", { className: "helper-description" }, React.createElement("p", null, "delete/backspace"), React.createElement("p", { style: { marginTop: 10 } }, "注意，删除的是鼠标所在位置的元素"))), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/63d9f2d3572c11df4168b2ce6b2762d0f603c2a6.jpg" })))), React.createElement(index_3.TabPanel, { tab: "辅助", activeKey: "3", className: "container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "显示空布局元素"), React.createElement("div", { className: "helper-description" }, "因为布局元素默认是没有宽高的，想要选中或者拖动，可以通过在树中选择，或者点击小眼睛后将其显示出来")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/1ad5ad6eddc451da19090106befd5266d116325b.jpg" }))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "helper-title-container" }, React.createElement("div", { className: "helper-title" }, "改变右工具栏宽度"), React.createElement("div", { className: "helper-description" }, "通过拖拽调节宽度")), React.createElement("div", { className: "image-container" }, React.createElement("img", { className: "image", src: "http://hiphotos.baidu.com/fex/%70%69%63/item/9d82d158ccbf6c81963a9504b43eb13532fa40c8.jpg" }))))))));
        }
    }]);
    return Helper;
}(React.Component);
Helper.defaultProps = new typings.Props();
__decorate([index_4.autoBindMethod], Helper.prototype, "handleShowModal", null);
__decorate([index_4.autoBindMethod], Helper.prototype, "handleOk", null);
__decorate([index_4.autoBindMethod], Helper.prototype, "handleCancel", null);
__decorate([index_4.autoBindMethod], Helper.prototype, "renderOperateButton", null);
Helper = __decorate([mobx_react_1.inject('setting', 'application', 'viewport'), mobx_react_1.observer], Helper);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Helper;