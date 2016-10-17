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
    _inherits(EditBoxScript, _React$Component);

    function EditBoxScript() {
        _classCallCheck(this, EditBoxScript);

        var _this = _possibleConstructorReturn(this, (EditBoxScript.__proto__ || Object.getPrototypeOf(EditBoxScript)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditBoxScript, [{
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