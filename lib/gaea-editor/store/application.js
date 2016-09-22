"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var mobx_1 = require('mobx');
var event_1 = require('./event');

var Application = function () {
    function Application() {
        _classCallCheck(this, Application);

        this.event = new event_1.default();
        this.headerHeight = 37;
        this.sidebarWidth = 240;
        this.footerHeight = 25;
        this.viewportWidth = 100;
        this.isSidebarMoving = false;
        this.isPreview = false;
        this.title = '';
        this.baseComponents = [];
        this.customComponents = [];
        this.comboComponents = [];
        this.isHideCustomComponents = false;
    }

    _createClass(Application, [{
        key: "setViewportWidth",
        value: function setViewportWidth(width) {
            this.viewportWidth = width;
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
        key: "setInitPropsToApplication",
        value: function setInitPropsToApplication(props) {
            this.title = props.title;
            this.baseComponents = props.baseComponents;
            this.setCustomComponents(props.customComponents);
            this.isHideCustomComponents = props.isHideCustomComponents;
            this.defaultValue = props.defaultValue;
            this.height = props.height;
            this.isReactNative = props.isReactNative;
        }
    }, {
        key: "setCustomComponents",
        value: function setCustomComponents(customComponents) {
            this.customComponents = customComponents;
        }
    }, {
        key: "addComboComponent",
        value: function addComboComponent(comboComponent) {
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
    }]);

    return Application;
}();

__decorate([mobx_1.observable], Application.prototype, "headerHeight", void 0);
__decorate([mobx_1.observable], Application.prototype, "sidebarWidth", void 0);
__decorate([mobx_1.observable], Application.prototype, "footerHeight", void 0);
__decorate([mobx_1.observable], Application.prototype, "viewportWidth", void 0);
__decorate([mobx_1.observable], Application.prototype, "isSidebarMoving", void 0);
__decorate([mobx_1.observable], Application.prototype, "isPreview", void 0);
__decorate([mobx_1.observable], Application.prototype, "comboComponents", void 0);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Application;
//# sourceMappingURL=application.js.map