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
var gaea_editor_manager_1 = require("../../../gaea-editor-manager/gaea-editor-manager");
var _ = require("lodash");

var ExternalVariableEditorAction = function () {
    function ExternalVariableEditorAction() {
        (0, _classCallCheck3.default)(this, ExternalVariableEditorAction);

        this.observableClass = true;
    }

    (0, _createClass3.default)(ExternalVariableEditorAction, [{
        key: "onInit",
        value: function onInit() {
            var _this = this;

            this.ViewportAction.middlewareRegister('setComponent', function (mapUniqueKey, componentInfo) {
                if (!componentInfo.props.gaeaVariables) {
                    componentInfo.props.gaeaVariables = {};
                }
                Object.keys(componentInfo.props.gaeaVariables).forEach(function (variableField) {
                    if (componentInfo.props.gaeaVariables[variableField] !== undefined) {
                        _this.externalVariableEditorStore.variables.set(mapUniqueKey + '_' + variableField, componentInfo.props.gaeaVariables[variableField]);
                    }
                });
                if (componentInfo.props.gaeaEdit) {
                    componentInfo.props.gaeaEdit = componentInfo.props.gaeaEdit.map(function (editInfo) {
                        if (editInfo.constructor.name !== 'String') {
                            if (componentInfo.props.gaeaVariables[editInfo.field] !== undefined) {
                                editInfo.hideTool = true;
                            } else {
                                editInfo.hideTool = false;
                            }
                        }
                        return editInfo;
                    });
                }
                return componentInfo;
            });
            this.ApplicationAction.middlewareRegister('cleanComponentProps', function (componentProps) {
                if (_.isEmpty(componentProps.gaeaVariables)) {
                    delete componentProps.gaeaVariables;
                }
                return componentProps;
            });
        }
    }, {
        key: "setCurrentEditComponentVariableByField",
        value: function setCurrentEditComponentVariableByField(field, variable) {
            this.ViewportStore.currentEditComponentInfo.props.gaeaVariables[field] = variable;
            this.externalVariableEditorStore.variables.set(this.ViewportStore.currentEditComponentMapUniqueKey + '_' + field, variable);
        }
    }, {
        key: "removeCurrentEditComponentVariableByField",
        value: function removeCurrentEditComponentVariableByField(field) {
            delete this.ViewportStore.currentEditComponentInfo.props.gaeaVariables[field];
            this.externalVariableEditorStore.variables.delete(this.ViewportStore.currentEditComponentMapUniqueKey + '_' + field);
        }
    }, {
        key: "hideCurrentEditTool",
        value: function hideCurrentEditTool(index) {
            this.ViewportStore.currentEditComponentInfo.props.gaeaEdit[index].hideTool = true;
        }
    }, {
        key: "showCurrentEditTool",
        value: function showCurrentEditTool(index) {
            this.ViewportStore.currentEditComponentInfo.props.gaeaEdit[index].hideTool = false;
        }
    }]);
    return ExternalVariableEditorAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ExternalVariableEditorAction;
__decorate([gaea_editor_manager_1.inject('ExternalVariableEditorStore')], ExternalVariableEditorAction.prototype, "externalVariableEditorStore", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportStore')], ExternalVariableEditorAction.prototype, "ViewportStore", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportAction')], ExternalVariableEditorAction.prototype, "ViewportAction", void 0);
__decorate([gaea_editor_manager_1.inject('ApplicationAction')], ExternalVariableEditorAction.prototype, "ApplicationAction", void 0);
__decorate([gaea_editor_manager_1.observable], ExternalVariableEditorAction.prototype, "observableClass", void 0);
__decorate([gaea_editor_manager_1.action('设置当前编辑组件某个字段使用的变量')], ExternalVariableEditorAction.prototype, "setCurrentEditComponentVariableByField", null);
__decorate([gaea_editor_manager_1.action('移除当前编辑组件某个字段使用的变量')], ExternalVariableEditorAction.prototype, "removeCurrentEditComponentVariableByField", null);
__decorate([gaea_editor_manager_1.action('隐藏当前编辑工具')], ExternalVariableEditorAction.prototype, "hideCurrentEditTool", null);
__decorate([gaea_editor_manager_1.action('显示当前编辑工具')], ExternalVariableEditorAction.prototype, "showCurrentEditTool", null);