"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

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
var index_1 = require('inject-instance');
var mobx_1 = require("mobx");
var deep_diff_1 = require("../utils/deep-diff");

var ApplicationAction = function () {
    function ApplicationAction() {
        (0, _classCallCheck3.default)(this, ApplicationAction);

        this.observableClass = true;
    }

    (0, _createClass3.default)(ApplicationAction, [{
        key: "loadingPluginByPosition",
        value: function loadingPluginByPosition(position) {
            var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            return this.application.plugins.map(function (plugin, index) {
                if (plugin.position === position) {
                    props.key = index;
                    return React.createElement(plugin, props);
                }
            });
        }
    }, {
        key: "setViewportStyle",
        value: function setViewportStyle(style) {
            this.application.viewportStyle = mobx_1.extendObservable(this.application.viewportStyle, style);
        }
    }, {
        key: "setViewportContainerStyle",
        value: function setViewportContainerStyle(style) {
            this.application.viewportContainerStyle = mobx_1.extendObservable(this.application.viewportContainerStyle, style);
        }
    }, {
        key: "resetViewportStyle",
        value: function resetViewportStyle() {
            this.application.viewportStyle = {};
        }
    }, {
        key: "getComponentClassByGaeaUniqueKey",
        value: function getComponentClassByGaeaUniqueKey(gaeaUniqueKey) {
            var allComponents = this.application.editorProps.commonComponents.concat(this.application.customComponents);
            return allComponents.find(function (component) {
                return component.defaultProps.gaeaUniqueKey === gaeaUniqueKey;
            });
        }
    }, {
        key: "setPreview",
        value: function setPreview(inPreview) {
            this.application.inPreview = inPreview;
        }
    }, {
        key: "updatePage",
        value: function updatePage(pageValue) {
            this.application.pageValue = pageValue;
        }
    }, {
        key: "toggleLeftBar",
        value: function toggleLeftBar(type) {
            if (this.application.leftBarType === type) {
                this.application.leftBarType = null;
            } else {
                this.application.leftBarType = type;
            }
        }
    }, {
        key: "cleanComponent",
        value: function cleanComponent(componentInfo) {
            var planComponentInfo = JSON.parse(JSON.stringify(componentInfo));
            if (planComponentInfo.layoutChilds && planComponentInfo.layoutChilds.length === 0) {
                delete planComponentInfo.layoutChilds;
            }
            planComponentInfo.props = this.cleanComponentProps(planComponentInfo.props);
            if (planComponentInfo.props === null) {
                delete planComponentInfo.props;
            }
            return JSON.parse(JSON.stringify(planComponentInfo));
        }
    }, {
        key: "cleanComponentProps",
        value: function cleanComponentProps(componentProps) {
            var defaultProps = _.cloneDeep(this.getComponentClassByGaeaUniqueKey(componentProps.gaeaUniqueKey).defaultProps);
            var planComponentProps = JSON.parse(JSON.stringify(componentProps));
            var deepDiffProps = deep_diff_1.default(planComponentProps, defaultProps);
            deepDiffProps.gaeaUniqueKey = planComponentProps.gaeaUniqueKey;
            planComponentProps = deepDiffProps;
            delete planComponentProps.gaeaEdit;
            delete planComponentProps.gaeaIcon;
            delete planComponentProps.gaeaEvent;
            if (planComponentProps.gaeaEventData.length === 0) {
                delete planComponentProps.gaeaEventData;
            }
            if (planComponentProps.gaeaNativeEventData.length === 0) {
                delete planComponentProps.gaeaNativeEventData;
            }
            if (_.isEmpty(planComponentProps.style)) {
                delete planComponentProps.style;
            }
            var middlewares = this.application.middleware.get('cleanComponentProps');
            if (middlewares) {
                middlewares.forEach(function (middleware) {
                    planComponentProps = middleware(planComponentProps);
                });
            }
            if (!planComponentProps || Object.keys(planComponentProps).length === 0) {
                return null;
            }
            return planComponentProps;
        }
    }, {
        key: "expendComponent",
        value: function expendComponent(componentInfo) {
            var planComponentInfo = _.toPlainObject(componentInfo);
            planComponentInfo.props = this.expendComponentProps(planComponentInfo.props);
            return planComponentInfo;
        }
    }, {
        key: "expendComponentProps",
        value: function expendComponentProps(componentProps) {
            var planComponentProps = _.toPlainObject(componentProps);
            var defaultProps = _.cloneDeep(this.getComponentClassByGaeaUniqueKey(planComponentProps.gaeaUniqueKey).defaultProps);
            planComponentProps = _.merge(defaultProps, planComponentProps);
            return planComponentProps;
        }
    }, {
        key: "middlewareRegister",
        value: function middlewareRegister(viewportFunctionName, func) {
            if (!this.application.middleware.has(viewportFunctionName)) {
                this.application.middleware.set(viewportFunctionName, [func]);
            } else {
                var funcs = this.application.middleware.get(viewportFunctionName);
                this.application.middleware.set(viewportFunctionName, funcs.concat(func));
            }
        }
    }]);
    return ApplicationAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplicationAction;
__decorate([index_1.inject('ApplicationStore')], ApplicationAction.prototype, "application", void 0);
__decorate([mobx_1.observable], ApplicationAction.prototype, "observableClass", void 0);
__decorate([mobx_1.action('根据位置加载插件')], ApplicationAction.prototype, "loadingPluginByPosition", null);
__decorate([mobx_1.action('设置视图区块样式')], ApplicationAction.prototype, "setViewportStyle", null);
__decorate([mobx_1.action('设置视图区块父级样式')], ApplicationAction.prototype, "setViewportContainerStyle", null);
__decorate([mobx_1.action('重置视图区块样式')], ApplicationAction.prototype, "resetViewportStyle", null);
__decorate([mobx_1.action('根据 gaeaUniqueKey 获取组件类')], ApplicationAction.prototype, "getComponentClassByGaeaUniqueKey", null);
__decorate([mobx_1.action('设置预览状态')], ApplicationAction.prototype, "setPreview", null);
__decorate([mobx_1.action('更新整体页面')], ApplicationAction.prototype, "updatePage", null);
__decorate([mobx_1.action('触发左边栏')], ApplicationAction.prototype, "toggleLeftBar", null);