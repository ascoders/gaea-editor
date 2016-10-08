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
var React = require('react');
var typings = require('./header.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-message');
var setting_component_1 = require('./setting/setting.component');
var keymaster = require('keymaster');
var classNames = require('classnames');
require('./header.css');
var Header = function (_React$Component) {
    _inherits(Header, _React$Component);

    function Header() {
        var _ref;

        _classCallCheck(this, Header);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Header, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            keymaster('ctrl+z', this.undo);
            keymaster('command+z', this.undo);
            keymaster('ctrl+shift+z', this.redo);
            keymaster('command+shift+z', this.redo);
            keymaster('ctrl+s', this.handleSave);
            keymaster('command+s', this.handleSave);
            keymaster('ctrl+c', this.copy);
            keymaster('command+c', this.copy);
            keymaster('ctrl+v', this.paste);
            keymaster('command+v', this.paste);
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            keymaster.unbind('ctrl+z');
            keymaster.unbind('command+z');
            keymaster.unbind('ctrl+shift+z');
            keymaster.unbind('command+shift+z');
            keymaster.unbind('ctrl+s');
            keymaster.unbind('command+s');
            keymaster.unbind('ctrl+c');
            keymaster.unbind('command+c');
            keymaster.unbind('ctrl+v');
            keymaster.unbind('command+v');
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
        key: "handleChangeViewportWidth",
        value: function handleChangeViewportWidth(width) {
            this.props.application.setViewportWidth(width);
        }
    }, {
        key: "handleChangeViewportWidthByRange",
        value: function handleChangeViewportWidthByRange(event) {
            this.props.application.setViewportWidth(Number(event.target.value));
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
            var mobileClasses = classNames({
                'menu-item': true,
                'viewport-size-active': this.props.application.viewportWidth === 40
            });
            var desktopClasses = classNames({
                'menu-item': true,
                'viewport-size-active': this.props.application.viewportWidth === 100
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-header", height: this.props.application.headerHeight - 1 }, React.createElement("div", { className: "left" }, React.createElement("div", { className: "brand menu-item" }, this.props.application.title), React.createElement(setting_component_1.default, null)), React.createElement("div", { className: "right" }, React.createElement("div", { className: "size-group" }, React.createElement("div", { className: mobileClasses, onClick: this.handleChangeViewportWidth.bind(this, 40) }, React.createElement("i", { className: "fa fa-mobile" })), React.createElement("div", { className: desktopClasses, onClick: this.handleChangeViewportWidth.bind(this, 100) }, React.createElement("i", { className: "fa fa-desktop" })), React.createElement("div", { className: "slider-container" }, React.createElement("input", { onChange: this.handleChangeViewportWidthByRange, min: "10", max: "100", step: "1", value: this.props.application.viewportWidth, className: "slider", type: "range" }))), React.createElement("div", { className: undoClasses, onClick: this.undo }, React.createElement("i", { className: "fa fa-undo" })), React.createElement("div", { className: redoClasses, onClick: this.redo }, React.createElement("i", { className: "fa fa-rotate-right" })), React.createElement("div", { className: "menu-item", onClick: this.handlePreview }, this.props.application.isPreview ? '取消' : '预览'), React.createElement("div", { className: "menu-item", onClick: this.handleSave }, "保存")));
        }
    }]);

    return Header;
}(React.Component);
Header.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], Header.prototype, "handleSave", null);
__decorate([index_1.autoBindMethod], Header.prototype, "handlePreview", null);
__decorate([index_1.autoBindMethod], Header.prototype, "undo", null);
__decorate([index_1.autoBindMethod], Header.prototype, "redo", null);
__decorate([index_1.autoBindMethod], Header.prototype, "copy", null);
__decorate([index_1.autoBindMethod], Header.prototype, "paste", null);
__decorate([index_1.autoBindMethod], Header.prototype, "handleChangeViewportWidth", null);
__decorate([index_1.autoBindMethod], Header.prototype, "handleChangeViewportWidthByRange", null);
Header = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], Header);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;