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
var typings = require("./tab-tools-components-common.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
require("./tab-tools-components-common.css");
var TabToolsComponentsCommon = function (_React$Component) {
    (0, _inherits3.default)(TabToolsComponentsCommon, _React$Component);

    function TabToolsComponentsCommon() {
        (0, _classCallCheck3.default)(this, TabToolsComponentsCommon);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TabToolsComponentsCommon.__proto__ || Object.getPrototypeOf(TabToolsComponentsCommon)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(TabToolsComponentsCommon, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.props.ViewportAction.registerOuterDrag(ReactDOM.findDOMNode(this));
        }
    }, {
        key: "render",
        value: function render() {
            var CommonDraggableItems = this.props.ApplicationStore.editorProps.commonComponents.map(function (ComponentClass, index) {
                return React.createElement("div", { key: index, "data-unique-key": ComponentClass.defaultProps.gaeaUniqueKey, className: "component-draggable-item" }, ComponentClass.defaultProps.gaeaName);
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-tab_tools_components_common" }, CommonDraggableItems);
        }
    }]);
    return TabToolsComponentsCommon;
}(React.Component);
TabToolsComponentsCommon.defaultProps = new typings.Props();
TabToolsComponentsCommon.position = 'tabToolsComponentsCommon';
TabToolsComponentsCommon = __decorate([EditorManager.observer(['ApplicationStore', 'ViewportAction'])], TabToolsComponentsCommon);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabToolsComponentsCommon;