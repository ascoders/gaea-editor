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
var mobx_1 = require("mobx");
var _ = require("lodash");
var deep_diff_1 = require("../utils/deep-diff");
var event_1 = require("./event");

var Application = function () {
    function Application() {
        (0, _classCallCheck3.default)(this, Application);

        this.event = new event_1.default();
        this.headerHeight = 37;
        this.leftSidebarWidth = 240;
        this.sidebarWidth = 240;
        this.sidebarAddonWidth = 280;
        this.footerHeight = 25;
        this.isSidebarMoving = false;
        this.isPreview = false;
        this.comboComponents = [];
        this.currentVersionPage = 0;
        this.versionList = [];
        this.baseComponents = [];
        this.customComponents = [];
        this.isHideCustomComponents = false;
        this.title = '';
    }

    (0, _createClass3.default)(Application, [{
        key: "setInitPropsToApplication",
        value: function setInitPropsToApplication(props) {
            this.title = props.title;
            this.baseComponents = props.baseComponents;
            this.setCustomComponents(props.customComponents);
            this.isHideCustomComponents = props.isHideCustomComponents;
            this.height = props.height;
            this.isReactNative = props.isReactNative;
            this.currentVersion = props.currentVersion;
            this.explore = props.explore;
        }
    }, {
        key: "setCustomComponents",
        value: function setCustomComponents(customComponents) {
            this.customComponents = customComponents;
        }
    }, {
        key: "addComboComponent",
        value: function addComboComponent(comboComponent) {
            var _this = this;

            comboComponent.componentInfo = this.cleanComponent(comboComponent.componentInfo);
            comboComponent.childs && Object.keys(comboComponent.childs).forEach(function (childMapUniqueKey) {
                comboComponent.childs[childMapUniqueKey] = _this.cleanComponent(comboComponent.childs[childMapUniqueKey]);
            });
            this.comboComponents.push(comboComponent);
        }
    }, {
        key: "getComponentByUniqueKey",
        value: function getComponentByUniqueKey(uniqueKey) {
            if (this.baseComponents) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.baseComponents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var component = _step.value;

                        if (component.defaultProps.gaeaUniqueKey === uniqueKey) {
                            return component;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this.customComponents[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _component = _step2.value;

                    if (_component.defaultProps.gaeaUniqueKey === uniqueKey) {
                        return _component;
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            return null;
        }
    }, {
        key: "setSidebarWidth",
        value: function setSidebarWidth(value) {
            if (value < 180) {
                value = 180;
            }
            if (value > 600) {
                value = 600;
            }
            this.sidebarWidth = value;
        }
    }, {
        key: "setSidebarMoving",
        value: function setSidebarMoving(isMoving) {
            this.isSidebarMoving = isMoving;
        }
    }, {
        key: "setPreview",
        value: function setPreview(isPreview) {
            this.isPreview = isPreview;
        }
    }, {
        key: "setCurrentVersionPage",
        value: function setCurrentVersionPage(page) {
            this.currentVersionPage = page;
        }
    }, {
        key: "addVersions",
        value: function addVersions(versions) {
            var _this2 = this;

            mobx_1.transaction(function () {
                versions && versions.forEach(function (version) {
                    _this2.versionList.push(version);
                });
            });
        }
    }, {
        key: "setCurrentVersion",
        value: function setCurrentVersion(version) {
            this.currentVersion = version;
        }
    }, {
        key: "publishToVersionList",
        value: function publishToVersionList(versionInfo) {
            if (this.versionList.length > 0) {
                this.versionList.unshift(versionInfo);
            }
        }
    }, {
        key: "cleanComponent",
        value: function cleanComponent(componentInfo) {
            var planComponentInfo = JSON.parse(JSON.stringify(componentInfo));
            var defaultProps = _.cloneDeep(this.getComponentByUniqueKey(planComponentInfo.props.gaeaUniqueKey).defaultProps);
            var deepDiffProps = deep_diff_1.default(planComponentInfo.props, defaultProps);
            deepDiffProps.gaeaUniqueKey = planComponentInfo.props.gaeaUniqueKey;
            planComponentInfo.props = deepDiffProps;
            if (planComponentInfo.layoutChilds && planComponentInfo.layoutChilds.length === 0) {
                delete planComponentInfo.layoutChilds;
            }
            if (!planComponentInfo.props || Object.keys(planComponentInfo.props).length === 0) {
                delete planComponentInfo.props;
            }
            delete planComponentInfo.props.gaeaEdit;
            delete planComponentInfo.props.gaeaIcon;
            if (planComponentInfo.props.gaeaEvent) {
                delete planComponentInfo.props.gaeaEvent.events;
                delete planComponentInfo.props.gaeaEvent.types;
            }
            return JSON.parse(JSON.stringify(planComponentInfo));
        }
    }, {
        key: "expendComponent",
        value: function expendComponent(componentInfo) {
            var planComponentInfo = _.toPlainObject(componentInfo);
            var defaultProps = _.cloneDeep(this.getComponentByUniqueKey(planComponentInfo.props.gaeaUniqueKey).defaultProps);
            planComponentInfo.props = _.merge(defaultProps, planComponentInfo.props);
            return planComponentInfo;
        }
    }]);
    return Application;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
__decorate([mobx_1.observable], Application.prototype, "headerHeight", void 0);
__decorate([mobx_1.observable], Application.prototype, "leftSidebarWidth", void 0);
__decorate([mobx_1.observable], Application.prototype, "sidebarWidth", void 0);
__decorate([mobx_1.observable], Application.prototype, "sidebarAddonWidth", void 0);
__decorate([mobx_1.observable], Application.prototype, "footerHeight", void 0);
__decorate([mobx_1.observable], Application.prototype, "isSidebarMoving", void 0);
__decorate([mobx_1.observable], Application.prototype, "isPreview", void 0);
__decorate([mobx_1.observable], Application.prototype, "comboComponents", void 0);
__decorate([mobx_1.observable], Application.prototype, "versionList", void 0);
__decorate([mobx_1.observable], Application.prototype, "currentVersion", void 0);
__decorate([mobx_1.action('初始化配置')], Application.prototype, "setInitPropsToApplication", null);
__decorate([mobx_1.action('设置定制组件')], Application.prototype, "setCustomComponents", null);
__decorate([mobx_1.action('添加一个组合')], Application.prototype, "addComboComponent", null);
__decorate([mobx_1.action('根据 uniqueKey 获取组件 Class')], Application.prototype, "getComponentByUniqueKey", null);
__decorate([mobx_1.action('设置侧边栏宽度')], Application.prototype, "setSidebarWidth", null);
__decorate([mobx_1.action('设置侧边栏是否在移动状态')], Application.prototype, "setSidebarMoving", null);
__decorate([mobx_1.action('修改预览状态')], Application.prototype, "setPreview", null);
__decorate([mobx_1.action('设置当前版本列表业务')], Application.prototype, "setCurrentVersionPage", null);
__decorate([mobx_1.action('添加版本')], Application.prototype, "addVersions", null);
__decorate([mobx_1.action('设置当前最新版本号')], Application.prototype, "setCurrentVersion", null);
__decorate([mobx_1.action('增加刚刚发布的版本到版本列表中')], Application.prototype, "publishToVersionList", null);