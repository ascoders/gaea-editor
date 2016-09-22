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
var ReactDOM = require('react-dom');
var typings = require('./edit-box.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-tabs');
var basic_component_1 = require('./basic/basic.component');
var script_component_1 = require('./script/script.component');
require('./edit-box.css');
var EditBox = function (_React$Component) {
    _inherits(EditBox, _React$Component);

    function EditBox() {
        var _ref;

        _classCallCheck(this, EditBox);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditBox.__proto__ || Object.getPrototypeOf(EditBox)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditBox, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            this.domInstance = ReactDOM.findDOMNode(this);
        }
    }, {
        key: "handleCloseClick",
        value: function handleCloseClick() {
            this.props.viewport.cancelEditComponent();
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.viewport.currentEditComponentMapUniqueKey === null) {
                return null;
            }
            var itemStyle = {
                height: "calc(100% - " + this.props.application.footerHeight + "px)",
                flexGrow: 0
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box container-box" }, React.createElement("span", { className: "handle-drag-close", onClick: this.handleCloseClick }, "x"), React.createElement(index_2.Tabs, { defaultActiveKey: "basic", type: "retro", className: "edit-box-handle" }, React.createElement(index_2.TabPanel, { tab: "基础", style: itemStyle, activeKey: "basic", className: "edit-container" }, React.createElement(basic_component_1.default, null)), React.createElement(index_2.TabPanel, { tab: "脚本", style: itemStyle, activeKey: "script", className: "edit-container" }, React.createElement(script_component_1.default, null))));
        }
    }]);

    return EditBox;
}(React.Component);
EditBox.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], EditBox.prototype, "handleCloseClick", null);
EditBox = __decorate([mobx_react_1.inject('application', 'viewport'), mobx_react_1.observer], EditBox);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBox;
//# sourceMappingURL=edit-box.component.js.map