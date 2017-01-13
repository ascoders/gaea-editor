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

var ApplicationStore = function () {
    function ApplicationStore() {
        (0, _classCallCheck3.default)(this, ApplicationStore);

        this.customComponents = [];
        this.navbarHeight = 41;
        this.plugins = [];
        this.pageValue = 'empty';
        this.viewportStyle = {
            backgroundColor: 'white',
            background: null,
            backgroundImage: null,
            width: null,
            height: null,
            flexGrow: 1
        };
        this.viewportContainerStyle = {
            backgroundColor: 'transparent'
        };
        this.inPreview = false;
        this.leftBarType = null;
        this.middleware = new Map();
    }

    (0, _createClass3.default)(ApplicationStore, [{
        key: "init",
        value: function init(props, plugins) {
            var _this = this;

            this.editorProps = props;
            if (this.editorProps.customOptions) {
                this.customComponents = this.editorProps.customComponents.filter(function (ComponentClass) {
                    if (!ComponentClass.name) {
                        return false;
                    }
                    if (!_this.editorProps.customOptions[ComponentClass.name]) {
                        return false;
                    }
                    return true;
                }).map(function (ComponentClass) {
                    if (!ComponentClass.defaultProps) {
                        ComponentClass.defaultProps = {};
                    }
                    ComponentClass.defaultProps = _.merge(ComponentClass.defaultProps, _this.editorProps.customOptions[ComponentClass.name]);
                    return ComponentClass;
                });
            } else {
                this.customComponents = this.editorProps.customComponents;
            }
            this.plugins = plugins.concat(props.plugins);
            this.pageValue = this.editorProps.defaultValue || null;
        }
    }]);
    return ApplicationStore;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ApplicationStore;
__decorate([mobx_1.observable], ApplicationStore.prototype, "pageValue", void 0);
__decorate([mobx_1.observable], ApplicationStore.prototype, "viewportStyle", void 0);
__decorate([mobx_1.observable], ApplicationStore.prototype, "viewportContainerStyle", void 0);
__decorate([mobx_1.observable], ApplicationStore.prototype, "inPreview", void 0);
__decorate([mobx_1.observable], ApplicationStore.prototype, "leftBarType", void 0);