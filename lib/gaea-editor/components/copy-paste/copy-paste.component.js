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
var typings = require("./copy-paste.type");
var keymaster = require("keymaster");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-message');
var action_1 = require("./action");
var store_1 = require("./store");
require("./copy-paste.css");
var CopyPaste = function (_React$Component) {
    (0, _inherits3.default)(CopyPaste, _React$Component);

    function CopyPaste() {
        (0, _classCallCheck3.default)(this, CopyPaste);

        var _this = (0, _possibleConstructorReturn3.default)(this, (CopyPaste.__proto__ || Object.getPrototypeOf(CopyPaste)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(CopyPaste, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            keymaster('command+c, ctrl+c', this.copy);
            keymaster('command+v, ctrl+v', this.paste);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            keymaster.unbind('command+c, ctrl+c');
            keymaster.unbind('command+v, ctrl+v');
        }
    }, {
        key: "copy",
        value: function copy() {
            if (this.props.ApplicationStore.inPreview || !this.props.ViewportStore.currentHoverComponentMapUniqueKey) {
                return;
            }
            this.props.CopyPasteAction.copy(this.props.ViewportStore.currentHoverComponentMapUniqueKey);
        }
    }, {
        key: "paste",
        value: function paste() {
            if (this.props.ApplicationStore.inPreview || !this.props.ViewportStore.currentHoverComponentMapUniqueKey) {
                return;
            }
            if (!this.props.CopyPasteAction.paste(this.props.ViewportStore.currentHoverComponentMapUniqueKey)) {
                index_2.default.warning('此处无法粘贴');
            }
        }
    }, {
        key: "render",
        value: function render() {
            return null;
        }
    }]);
    return CopyPaste;
}(React.Component);
CopyPaste.defaultProps = new typings.Props();
CopyPaste.position = 'navbarRight';
CopyPaste.Action = action_1.default;
CopyPaste.Store = store_1.default;
__decorate([index_1.autoBindMethod], CopyPaste.prototype, "copy", null);
__decorate([index_1.autoBindMethod], CopyPaste.prototype, "paste", null);
CopyPaste = __decorate([EditorManager.observer(['ApplicationStore', 'ViewportStore', 'CopyPasteStore', 'ViewportAction', 'CopyPasteAction'])], CopyPaste);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CopyPaste;