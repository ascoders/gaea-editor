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
var typings = require("./border.type");
var mobx_react_1 = require("mobx-react");
var index_1 = require('nt-web-button');
var index_2 = require('nt-web-number');
var color_component_1 = require("../../utils/color/color.component");
require("./border.css");
var EditComponentBorder = function (_React$Component) {
    (0, _inherits3.default)(EditComponentBorder, _React$Component);

    function EditComponentBorder() {
        (0, _classCallCheck3.default)(this, EditComponentBorder);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentBorder.__proto__ || Object.getPrototypeOf(EditComponentBorder)).apply(this, arguments));

        _this.state = new typings.State();
        _this.colorChangeStatus = 'finish';
        _this.colorHasChange = false;
        return _this;
    }

    (0, _createClass3.default)(EditComponentBorder, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
        }
    }, {
        key: "getCommonBorderRadius",
        value: function getCommonBorderRadius() {
            var borderRadius = 0;
            if (this.componentInfo.props.style.borderTopLeftRadius !== null) {
                borderRadius = this.componentInfo.props.style.borderTopLeftRadius;
            }
            if (this.componentInfo.props.style.borderTopRightRadius !== null) {
                borderRadius = this.componentInfo.props.style.borderTopRightRadius;
            }
            if (this.componentInfo.props.style.borderBottomRightRadius !== null) {
                borderRadius = this.componentInfo.props.style.borderBottomRightRadius;
            }
            if (this.componentInfo.props.style.borderBottomLeftRadius !== null) {
                borderRadius = this.componentInfo.props.style.borderBottomLeftRadius;
            }
            return borderRadius;
        }
    }, {
        key: "handleCommonBorderRadiusChange",
        value: function handleCommonBorderRadiusChange(value) {
            if (this.componentInfo.props.style.borderTopLeftRadius !== null || this.componentInfo.props.style.borderTopRightRadius !== null || this.componentInfo.props.style.borderBottomRightRadius !== null || this.componentInfo.props.style.borderBottomLeftRadius !== null) {
                this.props.viewport.prepareWriteHistory();
                if (this.componentInfo.props.style.borderTopLeftRadius !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopLeftRadius', parseFloat(value));
                }
                if (this.componentInfo.props.style.borderTopRightRadius !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopRightRadius', parseFloat(value));
                }
                if (this.componentInfo.props.style.borderBottomRightRadius !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomRightRadius', parseFloat(value));
                }
                if (this.componentInfo.props.style.borderBottomLeftRadius !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomLeftRadius', parseFloat(value));
                }
                this.props.viewport.writeHistory();
            }
        }
    }, {
        key: "handleRadiusClick",
        value: function handleRadiusClick(position) {
            switch (position) {
                case 'topLeft':
                    if (this.componentInfo.props.style.borderTopLeftRadius === null) {
                        this.props.viewport.updateComponentValue('style.borderTopLeftRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.viewport.updateComponentValue('style.borderTopLeftRadius', null);
                    }
                    break;
                case 'topRight':
                    if (this.componentInfo.props.style.borderTopRightRadius === null) {
                        this.props.viewport.updateComponentValue('style.borderTopRightRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.viewport.updateComponentValue('style.borderTopRightRadius', null);
                    }
                    break;
                case 'bottomRight':
                    if (this.componentInfo.props.style.borderBottomRightRadius === null) {
                        this.props.viewport.updateComponentValue('style.borderBottomRightRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.viewport.updateComponentValue('style.borderBottomRightRadius', null);
                    }
                    break;
                case 'bottomLeft':
                    if (this.componentInfo.props.style.borderBottomLeftRadius === null) {
                        this.props.viewport.updateComponentValue('style.borderBottomLeftRadius', this.getCommonBorderRadius());
                    } else {
                        this.props.viewport.updateComponentValue('style.borderBottomLeftRadius', null);
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
            if (this.componentInfo.props.style.borderLeftWidth !== null) {
                width = this.componentInfo.props.style.borderLeftWidth;
                style = this.componentInfo.props.style.borderLeftStyle;
                color = this.componentInfo.props.style.borderLeftColor;
            }
            if (this.componentInfo.props.style.borderTopWidth !== null) {
                width = this.componentInfo.props.style.borderTopWidth;
                style = this.componentInfo.props.style.borderTopStyle;
                color = this.componentInfo.props.style.borderTopColor;
            }
            if (this.componentInfo.props.style.borderRightWidth !== null) {
                width = this.componentInfo.props.style.borderRightWidth;
                style = this.componentInfo.props.style.borderRightStyle;
                color = this.componentInfo.props.style.borderRightColor;
            }
            if (this.componentInfo.props.style.borderBottomWidth !== null) {
                width = this.componentInfo.props.style.borderBottomWidth;
                style = this.componentInfo.props.style.borderBottomStyle;
                color = this.componentInfo.props.style.borderBottomColor;
            }
            if (this.props.application.isReactNative) {
                color = this.componentInfo.props.style.borderColor;
            }
            return { style: style, width: width, color: color };
        }
    }, {
        key: "handleBorderClick",
        value: function handleBorderClick(position) {
            var commonBorder = this.getCommonBorder();
            switch (position) {
                case 'left':
                    if (this.componentInfo.props.style.borderLeftWidth === null) {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftWidth', commonBorder.width);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftColor', commonBorder.color);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftStyle', commonBorder.style);
                        this.props.viewport.writeHistory();
                    } else {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftWidth', null);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftColor', null);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftStyle', null);
                        this.props.viewport.writeHistory();
                    }
                    break;
                case 'top':
                    if (this.componentInfo.props.style.borderTopWidth === null) {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopWidth', commonBorder.width);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderTopColor', commonBorder.color);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopStyle', commonBorder.style);
                        this.props.viewport.writeHistory();
                    } else {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopWidth', null);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderTopColor', null);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopStyle', null);
                        this.props.viewport.writeHistory();
                    }
                    break;
                case 'right':
                    if (this.componentInfo.props.style.borderRightWidth === null) {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightWidth', commonBorder.width);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderRightColor', commonBorder.color);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightStyle', commonBorder.style);
                        this.props.viewport.writeHistory();
                    } else {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightWidth', null);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderRightColor', null);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightStyle', null);
                        this.props.viewport.writeHistory();
                    }
                    break;
                case 'bottom':
                    if (this.componentInfo.props.style.borderBottomWidth === null) {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomWidth', commonBorder.width);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', commonBorder.color);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomColor', commonBorder.color);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomStyle', commonBorder.style);
                        this.props.viewport.writeHistory();
                    } else {
                        this.props.viewport.prepareWriteHistory();
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomWidth', null);
                        if (this.props.application.isReactNative) {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', null);
                        } else {
                            this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomColor', null);
                        }
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomStyle', null);
                        this.props.viewport.writeHistory();
                    }
                    break;
            }
        }
    }, {
        key: "handleBorderStyleChange",
        value: function handleBorderStyleChange(style) {
            if (this.componentInfo.props.style.borderTopWidth !== null || this.componentInfo.props.style.borderLeftWidth !== null || this.componentInfo.props.style.borderRightWidth !== null || this.componentInfo.props.style.borderBottomWidth !== null) {
                this.props.viewport.prepareWriteHistory();
                if (this.componentInfo.props.style.borderLeftWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftStyle', style);
                }
                if (this.componentInfo.props.style.borderTopWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopStyle', style);
                }
                if (this.componentInfo.props.style.borderRightWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightStyle', style);
                }
                if (this.componentInfo.props.style.borderBottomWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomStyle', style);
                }
                this.props.viewport.writeHistory();
            }
        }
    }, {
        key: "handleBorderColorChange",
        value: function handleBorderColorChange(color) {
            var rgba = "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")";
            if (this.componentInfo.props.style.borderTopWidth !== null || this.componentInfo.props.style.borderLeftWidth !== null || this.componentInfo.props.style.borderRightWidth !== null || this.componentInfo.props.style.borderBottomWidth !== null) {
                this.colorHasChange = true;
                if (this.colorChangeStatus === 'finish') {
                    this.colorChangeStatus = 'start';
                    this.props.viewport.prepareWriteHistory();
                }
                if (this.props.application.isReactNative) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderColor', rgba);
                } else {
                    if (this.componentInfo.props.style.borderLeftWidth !== null) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftColor', rgba);
                    }
                    if (this.componentInfo.props.style.borderTopWidth !== null) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderTopColor', rgba);
                    }
                    if (this.componentInfo.props.style.borderRightWidth !== null) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderRightColor', rgba);
                    }
                    if (this.componentInfo.props.style.borderBottomWidth !== null) {
                        this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomColor', rgba);
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
            if (this.colorHasChange) {
                this.props.viewport.writeHistory();
            }
        }
    }, {
        key: "handleBorderWidthChange",
        value: function handleBorderWidthChange(value) {
            if (this.componentInfo.props.style.borderTopWidth !== null || this.componentInfo.props.style.borderLeftWidth !== null || this.componentInfo.props.style.borderRightWidth !== null || this.componentInfo.props.style.borderBottomWidth !== null) {
                this.props.viewport.prepareWriteHistory();
                if (this.componentInfo.props.style.borderLeftWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderLeftWidth', parseFloat(value));
                }
                if (this.componentInfo.props.style.borderTopWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderTopWidth', parseFloat(value));
                }
                if (this.componentInfo.props.style.borderRightWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderRightWidth', parseFloat(value));
                }
                if (this.componentInfo.props.style.borderBottomWidth !== null) {
                    this.props.viewport.updateComponentValueWithNoHistory('style.borderBottomWidth', parseFloat(value));
                }
                this.props.viewport.writeHistory();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var borderRadius = this.getCommonBorderRadius();
            var commonBorder = this.getCommonBorder();
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-border" }, React.createElement("div", { className: "border-container" }, React.createElement("div", { className: "left-container" }, React.createElement(index_1.Button, { className: "border-left", active: this.componentInfo.props.style.borderLeftWidth !== null, onClick: this.handleBorderClick.bind(this, 'left') }, React.createElement("svg", { className: "svg-icon rotate-270" }, React.createElement("use", { xlinkHref: "#border" }))), React.createElement(index_1.Button, { className: "border-top", active: this.componentInfo.props.style.borderTopWidth !== null, onClick: this.handleBorderClick.bind(this, 'top') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#border" }))), React.createElement(index_1.Button, { className: "border-right", active: this.componentInfo.props.style.borderRightWidth !== null, onClick: this.handleBorderClick.bind(this, 'right') }, React.createElement("svg", { className: "svg-icon rotate-90" }, React.createElement("use", { xlinkHref: "#border" }))), React.createElement(index_1.Button, { className: "border-bottom", active: this.componentInfo.props.style.borderBottomWidth !== null, onClick: this.handleBorderClick.bind(this, 'bottom') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#border" })))), React.createElement("div", { className: "right-container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "Style"), React.createElement(index_1.ButtonGroup, null, this.props.application.isReactNative ? React.createElement(index_1.Button, { active: commonBorder.style === null, onClick: this.handleBorderStyleChange.bind(this, null) }, "x") : React.createElement(index_1.Button, { active: commonBorder.style === 'none', onClick: this.handleBorderStyleChange.bind(this, 'none') }, "x"), React.createElement(index_1.Button, { active: commonBorder.style === 'solid', onClick: this.handleBorderStyleChange.bind(this, 'solid') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#solid" }))), React.createElement(index_1.Button, { active: commonBorder.style === 'dashed', onClick: this.handleBorderStyleChange.bind(this, 'dashed') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#dashed" }))), React.createElement(index_1.Button, { active: commonBorder.style === 'dotted', onClick: this.handleBorderStyleChange.bind(this, 'dotted') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#dotted" }))))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "Width"), React.createElement(index_2.Number, { label: "", value: commonBorder.width ? commonBorder.width.toString() : '0', onChange: this.handleBorderWidthChange.bind(this) })), React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "Color"), React.createElement(color_component_1.default, { absoluteStyle: { left: -120 }, onChange: this.handleBorderColorChange.bind(this), onChangeComplete: this.handleBorderColorChangeComplete.bind(this), color: commonBorder.color || 'white' })))), React.createElement("div", { className: "radius-container" }, React.createElement("div", { className: "left-container" }, React.createElement("div", { className: "radius-content" }, React.createElement(index_1.Button, { className: "radius-left", active: this.componentInfo.props.style.borderTopLeftRadius !== null, onClick: this.handleRadiusClick.bind(this, 'topLeft') }, React.createElement("svg", { className: "svg-icon" }, React.createElement("use", { xlinkHref: "#border-radius" }))), React.createElement(index_1.Button, { className: "radius-top", active: this.componentInfo.props.style.borderTopRightRadius !== null, onClick: this.handleRadiusClick.bind(this, 'topRight') }, React.createElement("svg", { className: "svg-icon rotate-90" }, React.createElement("use", { xlinkHref: "#border-radius" }))), React.createElement(index_1.Button, { className: "radius-right", active: this.componentInfo.props.style.borderBottomRightRadius !== null, onClick: this.handleRadiusClick.bind(this, 'bottomRight') }, React.createElement("svg", { className: "svg-icon rotate-180" }, React.createElement("use", { xlinkHref: "#border-radius" }))), React.createElement(index_1.Button, { className: "radius-bottom", active: this.componentInfo.props.style.borderBottomLeftRadius !== null, onClick: this.handleRadiusClick.bind(this, 'bottomLeft') }, React.createElement("svg", { className: "svg-icon rotate-270" }, React.createElement("use", { xlinkHref: "#border-radius" }))))), React.createElement("div", { className: "right-container" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "icon-title" }, "边距"), React.createElement(index_2.Number, { label: "", min: 0, onChange: this.handleCommonBorderRadiusChange.bind(this), value: borderRadius ? borderRadius.toString() : '0' })))));
        }
    }]);
    return EditComponentBorder;
}(React.Component);
EditComponentBorder.defaultProps = new typings.Props();
EditComponentBorder = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditComponentBorder);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentBorder;