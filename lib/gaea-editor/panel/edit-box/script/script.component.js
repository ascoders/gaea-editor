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
var typings = require("./script.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
var Codemirror = {};
if (window) {
    Codemirror = require('react-codemirror');
    require('codemirror/lib/codemirror.css');
    require('codemirror/mode/javascript/javascript');
}
var defaultValue = _.trim("\n/**\n * 初始化函数,在组件创建时系统自动调用\n */\nfunction componentWillMount() {\n\n}\n\n/**\n * 初始化函数,在组件 DOM 节点创建后系统自动调用\n */\nfunction componentDidMount() {\n\n}\n\n/**\n * 析构函数,在组件销毁时系统自动调用\n */\nfunction componentWillUnmount() {\n\n}\n");
var codeMirrorOpts = {
    lineNumbers: true,
    readOnly: false,
    mode: 'javascript',
    theme: 'default',
    tabSize: 2
};
var EditBoxScript = function (_React$Component) {
    (0, _inherits3.default)(EditBoxScript, _React$Component);

    function EditBoxScript() {
        (0, _classCallCheck3.default)(this, EditBoxScript);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditBoxScript.__proto__ || Object.getPrototypeOf(EditBoxScript)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditBoxScript, [{
        key: "handleCodeChange",
        value: function handleCodeChange() {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-script" }, React.createElement(Codemirror, { onChange: this.handleCodeChange, defaultValue: defaultValue, options: codeMirrorOpts }), React.createElement(index_1.ButtonGroup, null, React.createElement(index_1.Button, { active: true }, "test")));
        }
    }]);
    return EditBoxScript;
}(React.Component);
EditBoxScript.defaultProps = new typings.Props();
EditBoxScript = __decorate([mobx_react_1.observer], EditBoxScript);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBoxScript;