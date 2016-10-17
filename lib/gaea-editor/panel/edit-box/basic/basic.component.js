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
var typings = require("./basic.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-auto-bind');
var index_2 = require('nt-web-button');
var index_3 = require('nt-web-input');
var remove_button_component_1 = require("./remove-button/remove-button.component");
var set_group_button_component_1 = require("./set-group-button/set-group-button.component");
var text_component_1 = require("./edit-components/text/text.component");
var select_component_1 = require("./edit-components/select/select.component");
var switch_component_1 = require("./edit-components/switch/switch.component");
var array_component_1 = require("./edit-components/array/array.component");
var margin_padding_component_1 = require("./edit-components/margin-padding/margin-padding.component");
var number_component_1 = require("./edit-components/number/number.component");
var width_height_component_1 = require("./edit-components/width-height/width-height.component");
var layout_component_1 = require("./edit-components/layout/layout.component");
var overflow_component_1 = require("./edit-components/overflow/overflow.component");
var background_component_1 = require("./edit-components/background/background.component");
var font_component_1 = require("./edit-components/font/font.component");
var border_component_1 = require("./edit-components/border/border.component");
var instance_component_1 = require("./edit-components/instance/instance.component");
require("./basic.css");
var EditBoxBasic = function (_React$Component) {
    _inherits(EditBoxBasic, _React$Component);

    function EditBoxBasic() {
        _classCallCheck(this, EditBoxBasic);

        var _this = _possibleConstructorReturn(this, (EditBoxBasic.__proto__ || Object.getPrototypeOf(EditBoxBasic)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditBoxBasic, [{
        key: "resetOptions",
        value: function resetOptions() {
            this.props.viewport.resetComponent(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "handleChangeName",
        value: function handleChangeName(value) {
            this.componentInfo.props.gaeaName = value;
        }
    }, {
        key: "titleInputRightRender",
        value: function titleInputRightRender() {
            if (this.componentInfo.parentMapUniqueKey === null) {
                return null;
            }
            return React.createElement(remove_button_component_1.default, null);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            if (!this.props.viewport.currentEditComponentMapUniqueKey) {
                return null;
            }
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            var Editors = this.componentInfo.props.gaeaEdit && this.componentInfo.props.gaeaEdit.map(function (editOption, index) {
                var key = _this2.props.viewport.currentEditComponentMapUniqueKey + "-" + editOption.field + "-" + editOption.editor;
                var EditElement = null;
                if (editOption.constructor.name === 'String') {
                    key = _this2.props.viewport.currentEditComponentMapUniqueKey + "-" + editOption.toString();
                    return React.createElement("div", { className: "header-title", style: { marginTop: index === 0 ? 0 : 5 }, key: key }, editOption.toString());
                }
                switch (editOption.editor) {
                    case 'text':
                        EditElement = React.createElement(text_component_1.default, { editOption: editOption });
                        break;
                    case 'selector':
                        EditElement = React.createElement(select_component_1.default, { editOption: editOption });
                        break;
                    case 'switch':
                        EditElement = React.createElement(switch_component_1.default, { editOption: editOption });
                        break;
                    case 'array':
                        EditElement = React.createElement(array_component_1.default, { editOption: editOption });
                        break;
                    case 'marginPadding':
                        EditElement = React.createElement(margin_padding_component_1.default, { editOption: editOption });
                        break;
                    case 'number':
                        EditElement = React.createElement(number_component_1.default, { editOption: editOption });
                        break;
                    case 'widthHeight':
                        EditElement = React.createElement(width_height_component_1.default, { editOption: editOption });
                        break;
                    case 'layout':
                        EditElement = React.createElement(layout_component_1.default, { editOption: editOption });
                        break;
                    case 'overflow':
                        EditElement = React.createElement(overflow_component_1.default, { editOption: editOption });
                        break;
                    case 'background':
                        EditElement = React.createElement(background_component_1.default, { editOption: editOption });
                        break;
                    case 'font':
                        EditElement = React.createElement(font_component_1.default, { editOption: editOption });
                        break;
                    case 'border':
                        EditElement = React.createElement(border_component_1.default, { editOption: editOption });
                        break;
                    case 'instance':
                        EditElement = React.createElement(instance_component_1.default, { editOption: editOption });
                        break;
                }
                return React.createElement("div", { key: key, className: "edit-line-container" }, editOption.label !== '' && React.createElement("div", { className: "edit-line-label" }, editOption.label), React.createElement("div", { className: "edit-line-editor" }, EditElement));
            });
            var ResetButton = null;
            if (this.componentInfo.parentMapUniqueKey !== null) {
                ResetButton = React.createElement(index_2.Button, { onClick: this.resetOptions }, "重置");
            }
            var GroupButton = null;
            if (this.componentInfo.props.gaeaUniqueKey === 'gaea-layout' && this.componentInfo.parentMapUniqueKey !== null) {
                GroupButton = React.createElement(set_group_button_component_1.default, null);
            }
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic" }, React.createElement("div", { className: "basic-title-container" }, React.createElement("div", { className: "component-icon-container" }, React.createElement("i", { className: "fa fa-" + this.componentInfo.props.gaeaIcon })), React.createElement(index_3.default, { className: "title-name", label: "", normal: true, key: this.props.viewport.currentEditComponentMapUniqueKey, onChange: this.handleChangeName, rightRender: this.titleInputRightRender, value: this.componentInfo.props.gaeaName })), React.createElement("div", { className: "edit-item-container" }, Editors), React.createElement("div", { className: "bottom-addon" }, React.createElement(index_2.ButtonGroup, null, ResetButton, GroupButton)));
        }
    }]);

    return EditBoxBasic;
}(React.Component);
EditBoxBasic.defaultProps = new typings.Props();
__decorate([index_1.autoBindMethod], EditBoxBasic.prototype, "resetOptions", null);
__decorate([index_1.autoBindMethod], EditBoxBasic.prototype, "handleChangeName", null);
__decorate([index_1.autoBindMethod], EditBoxBasic.prototype, "titleInputRightRender", null);
EditBoxBasic = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditBoxBasic);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditBoxBasic;