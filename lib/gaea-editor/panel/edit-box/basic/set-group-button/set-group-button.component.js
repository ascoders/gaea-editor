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
var typings = require('./set-group-button.type');
var mobx_react_1 = require('mobx-react');
var index_1 = require('nt-web-modal');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-input');
require('./set-group-button.css');
var SetGroupButton = function (_React$Component) {
    _inherits(SetGroupButton, _React$Component);

    function SetGroupButton() {
        var _ref;

        _classCallCheck(this, SetGroupButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = SetGroupButton.__proto__ || Object.getPrototypeOf(SetGroupButton)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(SetGroupButton, [{
        key: "handleShowModal",
        value: function handleShowModal() {
            this.setState({
                show: true
            });
        }
    }, {
        key: "handleOk",
        value: function handleOk() {
            var fullInfo = this.props.viewport.getComponentFullInfoByMapUniqueKey(this.props.viewport.currentEditComponentMapUniqueKey);
            this.props.application.addComboComponent({
                name: this.state.name,
                mapUniqueKey: fullInfo.mapUniqueKey,
                componentInfo: fullInfo.componentInfo,
                childs: fullInfo.childs
            });
            this.setState({
                show: false,
                name: ''
            });
        }
    }, {
        key: "handleCancel",
        value: function handleCancel() {
            this.setState({
                show: false,
                name: ''
            });
        }
    }, {
        key: "handleChangeName",
        value: function handleChangeName(value) {
            this.setState({
                name: value
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(index_2.default, { onClick: this.handleShowModal.bind(this) }, "设为组合", React.createElement(index_1.default, { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-set_group_button", show: this.state.show, onOk: this.handleOk.bind(this), onCancel: this.handleCancel.bind(this) }, React.createElement(index_3.default, { onChange: this.handleChangeName.bind(this), label: "输入组名" }), React.createElement("p", { className: "description" }, "设为组合的元素,会在右侧『组件』栏中『组合』选项中出现.")));
        }
    }]);

    return SetGroupButton;
}(React.Component);
SetGroupButton.defaultProps = new typings.Props();
SetGroupButton = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], SetGroupButton);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SetGroupButton;