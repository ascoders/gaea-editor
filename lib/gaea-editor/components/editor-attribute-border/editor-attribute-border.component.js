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
var typings = require("./editor-attribute-border.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-number');
var color_component_1 = require("../../utils/color/color.component");
require("./editor-attribute-border.css");
var EditorAttributeBorder = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeBorder, _React$Component);

    function EditorAttributeBorder() {
        (0, _classCallCheck3.default)(this, EditorAttributeBorder);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeBorder.__proto__ || Object.getPrototypeOf(EditorAttributeBorder)).apply(this, arguments));

        _this.state = new typings.State();
        _this.colorChangeStatus = 'finish';
        _this.colorHasChange = false;
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeBorder, [{
        key: "getCommonBorderRadius",
        value: function getCommonBorderRadius() {
            var borderRadius = 0;
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null) {
                borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius;
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null) {
                borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius;
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null) {
                borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius;
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null) {
                borderRadius = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius;
            }
            return borderRadius;
        }
    }, {
        key: "handleCommonBorderRadiusChange",
        value: function handleCommonBorderRadiusChange(value) {
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null) {
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopLeftRadius', parseFloat(value));
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopRightRadius', parseFloat(value));
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomRightRadius', parseFloat(value));
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomLeftRadius', parseFloat(value));
                }
            }
        }
    }, {
        key: "handleRadiusClick",
        value: function handleRadiusClick(position) {
            switch (position) {
                case 'topLeft':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopLeftRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopLeftRadius', null);
                    }
                    break;
                case 'topRight':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopRightRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopRightRadius', null);
                    }
                    break;
                case 'bottomRight':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomRightRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomRightRadius', null);
                    }
                    break;
                case 'bottomLeft':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomLeftRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomLeftRadius', null);
                    }
                    break;
            }
        }
    }, {
        key: "getCommonBorder",
        value: function getCommonBorder() {
            var style = void 0;
            var width = void 0;
            var color = void 0;
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth;
                style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftStyle;
                color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftColor;
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth;
                style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopStyle;
                color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopColor;
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth;
                style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightStyle;
                color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightColor;
            }
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                width = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth;
                style = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomStyle;
                color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomColor;
            }
            if (this.props.ApplicationStore.editorProps.isReactNative) {
                color = this.props.ViewportStore.currentEditComponentInfo.props.style.borderColor;
            }
            return { style: style, width: width, color: color };
        }
    }, {
        key: "handleBorderClick",
        value: function handleBorderClick(position) {
            var commonBorder = this.getCommonBorder();
            switch (position) {
                case 'left':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftWidth', commonBorder.width);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftColor', commonBorder.color);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftStyle', commonBorder.style);
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftWidth', null);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftColor', null);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftStyle', null);
                    }
                    break;
                case 'top':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopWidth', commonBorder.width);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopColor', commonBorder.color);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopStyle', commonBorder.style);
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopWidth', null);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopColor', null);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopStyle', null);
                    }
                    break;
                case 'right':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightWidth', commonBorder.width);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightColor', commonBorder.color);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightStyle', commonBorder.style);
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightWidth', null);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightColor', null);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightStyle', null);
                    }
                    break;
                case 'bottom':
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth === null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomWidth', commonBorder.width);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', commonBorder.color);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomColor', commonBorder.color);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomStyle', commonBorder.style);
                    } else {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomWidth', null);
                        if (this.props.ApplicationStore.editorProps.isReactNative) {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', null);
                        } else {
                            this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomColor', null);
                        }
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomStyle', null);
                    }
                    break;
            }
        }
    }, {
        key: "handleBorderStyleChange",
        value: function handleBorderStyleChange(style) {
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftStyle', style);
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopStyle', style);
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightStyle', style);
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomStyle', style);
                }
            }
        }
    }, {
        key: "handleBorderColorChange",
        value: function handleBorderColorChange(color) {
            var rgba = "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")";
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                this.colorHasChange = true;
                if (this.colorChangeStatus === 'finish') {
                    this.colorChangeStatus = 'start';
                }
                if (this.props.ApplicationStore.editorProps.isReactNative) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderColor', rgba);
                } else {
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftColor', rgba);
                    }
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopColor', rgba);
                    }
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightColor', rgba);
                    }
                    if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                        this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomColor', rgba);
                    }
                }
            } else {
                this.colorHasChange = false;
            }
        }
    }, {
        key: "handleBorderColorChangeComplete",
        value: function handleBorderColorChangeComplete() {
            this.colorChangeStatus = 'finish';
            if (this.colorHasChange) {}
        }
    }, {
        key: "handleBorderWidthChange",
        value: function handleBorderWidthChange(value) {
            if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null || this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderLeftWidth', parseFloat(value));
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderTopWidth', parseFloat(value));
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderRightWidth', parseFloat(value));
                }
                if (this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null) {
                    this.props.ViewportAction.updateCurrentEditComponentProps('style.borderBottomWidth', parseFloat(value));
                }
            }
        }
    }, {
        key: "render",
        value: function render() {
            if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
                return null;
            }
            var borderRadius = this.getCommonBorderRadius();
            var commonBorder = this.getCommonBorder();
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_border" }, React.createElement("div", { className: "border-container" }, React.createElement("div", { className: "left-container" }, React.createElement(index_1.Button, { className: "border-left", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderLeftWidth !== null, onClick: this.handleBorderClick.bind(this, 'left') }, React.createElement("svg", { className: "svg-icon rotate-270" }, React.createElement("use", { xlinkHref: "#border" }))), React.createElement(index_1.Button, { className: "border-top", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopWidth !== null, onClick: this.handleBorderClick.bind(this, 'top') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#border" }))), React.createElement(index_1.Button, { className: "border-right", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderRightWidth !== null, onClick: this.handleBorderClick.bind(this, 'right') }, React.createElement("svg", { className: "svg-icon rotate-90" }, React.createElement("use", { xlinkHref: "#border" }))), React.createElement(index_1.Button, { className: "border-bottom", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomWidth !== null, onClick: this.handleBorderClick.bind(this, 'bottom') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#border" })))), React.createElement("div", { className: "right-container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "Style"), React.createElement(index_1.ButtonGroup, null, this.props.ApplicationStore.editorProps.isReactNative ? React.createElement(index_1.Button, { active: commonBorder.style === null, onClick: this.handleBorderStyleChange.bind(this, null) }, "x") : React.createElement(index_1.Button, { active: commonBorder.style === 'none', onClick: this.handleBorderStyleChange.bind(this, 'none') }, "x"), React.createElement(index_1.Button, { active: commonBorder.style === 'solid', onClick: this.handleBorderStyleChange.bind(this, 'solid') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#solid" }))), React.createElement(index_1.Button, { active: commonBorder.style === 'dashed', onClick: this.handleBorderStyleChange.bind(this, 'dashed') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#dashed" }))), React.createElement(index_1.Button, { active: commonBorder.style === 'dotted', onClick: this.handleBorderStyleChange.bind(this, 'dotted') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#dotted" }))))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "Width"), React.createElement(index_2.Number, { label: "", value: commonBorder.width ? commonBorder.width.toString() : '0', onChange: this.handleBorderWidthChange.bind(this) })), React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "Color"), React.createElement(color_component_1.default, { onChange: this.handleBorderColorChange.bind(this), onChangeComplete: this.handleBorderColorChangeComplete.bind(this), color: commonBorder.color || 'white' })))), React.createElement("div", { className: "radius-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "radius-content" }, React.createElement(index_1.Button, { className: "radius-left", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopLeftRadius !== null, onClick: this.handleRadiusClick.bind(this, 'topLeft') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#border-radius" }))), React.createElement(index_1.Button, { className: "radius-top", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderTopRightRadius !== null, onClick: this.handleRadiusClick.bind(this, 'topRight') }, React.createElement("svg", { className: "svg-icon rotate-90" }, React.createElement("use", { xlinkHref: "#border-radius" }))), React.createElement(index_1.Button, { className: "radius-right", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomRightRadius !== null, onClick: this.handleRadiusClick.bind(this, 'bottomRight') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#border-radius" }))), React.createElement(index_1.Button, { className: "radius-bottom", active: this.props.ViewportStore.currentEditComponentInfo.props.style.borderBottomLeftRadius !== null, onClick: this.handleRadiusClick.bind(this, 'bottomLeft') }, React.createElement("svg", { className: "svg-icon rotate-270" }, React.createElement("use", { xlinkHref: "#border-radius" }))))), React.createElement("div", { className: "right-container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "边距"), React.createElement(index_2.Number, { label: "", min: 0, onChange: this.handleCommonBorderRadiusChange.bind(this), value: borderRadius ? borderRadius.toString() : '0' })))));
        }
    }]);
    return EditorAttributeBorder;
}(React.Component);
EditorAttributeBorder.defaultProps = new typings.Props();
EditorAttributeBorder.position = 'editorAttributeBorder';
EditorAttributeBorder = __decorate([EditorManager.observer(['ViewportStore', 'ViewportAction', 'ApplicationStore', 'ApplicationAction'])], EditorAttributeBorder);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeBorder;