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
var typings = require("./editor-tabs.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-tabs');
require("./editor-tabs.css");
var EditorTabs = function (_React$Component) {
    (0, _inherits3.default)(EditorTabs, _React$Component);

    function EditorTabs() {
        (0, _classCallCheck3.default)(this, EditorTabs);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorTabs.__proto__ || Object.getPrototypeOf(EditorTabs)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorTabs, [{
        key: "render",
        value: function render() {
            if (this.props.ViewportStore.showEditComponents === false) {
                return null;
            }
            var attributeName = this.props.EditorEventStore.currentEditPropsIndex === null ? '属性' : '修改属性';
            return React.createElement(index_1.Tabs, { defaultActiveKey: "attribute", className: "nt-editor-gaea-editor-gaea_editor-components-editor_tabs", type: "retro" }, React.createElement(index_1.TabPanel, { tab: attributeName, activeKey: "attribute", className: "tab-panel" }, this.props.ApplicationAction.loadingPluginByPosition('editorAttribute')), React.createElement(index_1.TabPanel, { tab: "事件", activeKey: "event", className: "tab-panel" }, this.props.ApplicationAction.loadingPluginByPosition('editorEvent')));
        }
    }]);
    return EditorTabs;
}(React.Component);
EditorTabs.defaultProps = new typings.Props();
EditorTabs.position = 'editor';
EditorTabs = __decorate([EditorManager.observer(['ViewportStore', 'EditorEventStore', 'ApplicationAction'])], EditorTabs);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorTabs;