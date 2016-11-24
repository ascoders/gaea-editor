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
var typings = require("./save.type");
var keymaster = require("keymaster");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
require("./save.css");
var Save = function (_React$Component) {
    (0, _inherits3.default)(Save, _React$Component);

    function Save() {
        (0, _classCallCheck3.default)(this, Save);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Save.__proto__ || Object.getPrototypeOf(Save)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Save, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            keymaster('command+s, ctrl+s', this.handleClick);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            keymaster.unbind('command+s, ctrl+s');
        }
    }, {
        key: "handleClick",
        value: function handleClick() {
            var componentsInfo = this.props.ViewportAction.getIncrementComponentsInfo();
            this.props.ApplicationStore.editorProps.onSave(componentsInfo, this.props.GlobalSettingAction.getZipSettingData());
            return false;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { onClick: this.handleClick }, "保存");
        }
    }]);
    return Save;
}(React.Component);
Save.defaultProps = new typings.Props();
Save.position = 'navbarRight';
__decorate([index_1.autoBindMethod], Save.prototype, "handleClick", null);
Save = __decorate([EditorManager.observer(['ApplicationStore', 'ViewportAction', 'GlobalSettingAction'])], Save);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Save;