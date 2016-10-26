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
var typings = require("./header.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-message');
var setting_component_1 = require("./setting/setting.component");
var publish_component_1 = require("./publish/publish.component");
var helper_component_1 = require("./helper/helper.component");
var size_component_1 = require("./size/size.component");
var keymaster = require("keymaster");
var classNames = require("classnames");
require("./header.css");
var Header = function (_React$Component) {
    (0, _inherits3.default)(Header, _React$Component);

    function Header() {
        (0, _classCallCheck3.default)(this, Header);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Header, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            keymaster('ctrl+z, command+z', this.undo);
            keymaster('ctrl+shift+z, command+shift+z', this.redo);
            if (!this.props.application.explore) {
                keymaster('ctrl+s, command+s', this.handleSave);
            }
            keymaster('command+c, ctrl+c', this.copy);
            keymaster('command+v, ctrl+v', this.paste);
            keymaster('delete, backspace', this.del);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            keymaster.unbind('ctrl+z, command+z');
            keymaster.unbind('ctrl+shift+z, command+shift+z');
            if (!this.props.application.explore) {
                keymaster.unbind('ctrl+s, command+s');
            }
            keymaster.unbind('command+c, ctrl+c');
            keymaster.unbind('command+v, ctrl+v');
            keymaster.unbind('delete, backspace');
        }
    }, {
        key: "handleSave",
        value: function handleSave() {
            if (this.props.application.isPreview) {
                return;
            }
            var componentsInfo = this.props.viewport.getIncrementComponentsInfo();
            this.props.application.event.emit(this.props.application.event.onSave, componentsInfo);
            return false;
        }
    }, {
        key: "handlePreview",
        value: function handlePreview() {
            this.props.application.setPreview(!this.props.application.isPreview);
            if (this.props.application.isPreview) {
                this.props.viewport.hideSidebarAddon();
                if (this.props.viewport.lastSelectMapUniqueKey) {
                    this.props.application.event.emit(this.props.application.event.changeComponentSelectStatusEvent, {
                        mapUniqueKey: this.props.viewport.lastSelectMapUniqueKey,
                        selected: false
                    });
                }
            }
        }
    }, {
        key: "undo",
        value: function undo() {
            if (this.props.application.isPreview) {
                return;
            }
            this.props.viewport.undo();
            return false;
        }
    }, {
        key: "redo",
        value: function redo() {
            if (this.props.application.isPreview) {
                return;
            }
            this.props.viewport.redo();
            return false;
        }
    }, {
        key: "del",
        value: function del() {
            if (this.props.viewport.hoveringComponentMapUniqueKey === null) {
                return;
            }
            this.props.viewport.deleteComponentByMapUniqueKeyWithHistory(this.props.viewport.hoveringComponentMapUniqueKey);
            this.props.viewport.setHoveringComponentMapUniqueKey(null);
        }
    }, {
        key: "copy",
        value: function copy() {
            if (this.props.application.isPreview) {
                return;
            }
            this.props.viewport.copy(this.props.viewport.hoveringComponentMapUniqueKey);
            return false;
        }
    }, {
        key: "paste",
        value: function paste() {
            if (this.props.application.isPreview) {
                return;
            }
            if (!this.props.viewport.paste(this.props.viewport.hoveringComponentMapUniqueKey)) {
                index_2.default.warning('此处无法粘贴');
            }
            return false;
        }
    }, {
        key: "render",
        value: function render() {
            var undoClasses = classNames({
                'menu-item': true,
                'operate-disable': !this.props.viewport.canUndo
            });
            var redoClasses = classNames({
                'menu-item': true,
                'operate-disable': !this.props.viewport.canRedo
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header", height: this.props.application.headerHeight - 1 }, React.createElement("div", { className: "left" }, React.createElement("div", { className: "brand menu-item" }, this.props.application.title), React.createElement(setting_component_1.default, null), React.createElement(helper_component_1.default, null)), React.createElement("div", { className: "right" }, React.createElement(size_component_1.default, null), React.createElement("div", { className: undoClasses, onClick: this.undo }, React.createElement("i", { className: "fa fa-undo" })), React.createElement("div", { className: redoClasses, onClick: this.redo }, React.createElement("i", { className: "fa fa-rotate-right" })), React.createElement("div", { className: "menu-item", onClick: this.handlePreview }, this.props.application.isPreview ? '取消' : '预览'), !this.props.application.explore && React.createElement("div", { className: "menu-item", onClick: this.handleSave }, "保存"), !this.props.application.explore && React.createElement(publish_component_1.default, null)));
        }
    }]);
    return Header;
}(React.Component);
Header.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Header.prototype, "handleSave", null);
__decorate([index_1.autoBindMethod], Header.prototype, "handlePreview", null);
__decorate([index_1.autoBindMethod], Header.prototype, "undo", null);
__decorate([index_1.autoBindMethod], Header.prototype, "redo", null);
__decorate([index_1.autoBindMethod], Header.prototype, "del", null);
__decorate([index_1.autoBindMethod], Header.prototype, "copy", null);
__decorate([index_1.autoBindMethod], Header.prototype, "paste", null);
Header = __decorate([mobx_react_1.inject('application', 'viewport', 'setting'), mobx_react_1.observer], Header);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;