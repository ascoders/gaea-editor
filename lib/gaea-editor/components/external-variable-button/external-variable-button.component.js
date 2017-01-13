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
var typings = require("./external-variable-button.type");
var classNames = require("classnames");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-tooltip');
var index_2 = require('nt-auto-bind');
require("./external-variable-button.css");
var ExternalVariable = function (_React$Component) {
    (0, _inherits3.default)(ExternalVariable, _React$Component);

    function ExternalVariable() {
        (0, _classCallCheck3.default)(this, ExternalVariable);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ExternalVariable.__proto__ || Object.getPrototypeOf(ExternalVariable)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(ExternalVariable, [{
        key: "handleClick",
        value: function handleClick() {
            this.props.ApplicationAction.toggleLeftBar('externalVariable');
        }
    }, {
        key: "render",
        value: function render() {
            var classes = classNames({
                'nt-editor-gaea-editor-gaea_editor-components-external_variable_button': true,
                'active': this.props.ApplicationStore.leftBarType === 'externalVariable'
            });
            return React.createElement(index_1.Tooltip, { title: "外部传参设置" }, React.createElement("div", { className: classes, onClick: this.handleClick }, React.createElement("i", { className: "fa fa-ravelry" })));
        }
    }]);
    return ExternalVariable;
}(React.Component);
ExternalVariable.defaultProps = new typings.Props();
ExternalVariable.position = 'leftBarTop';
__decorate([index_2.autoBindMethod], ExternalVariable.prototype, "handleClick", null);
ExternalVariable = __decorate([EditorManager.observer(['ApplicationAction', 'ApplicationStore'])], ExternalVariable);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExternalVariable;