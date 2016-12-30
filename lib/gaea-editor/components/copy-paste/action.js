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

var CopyPasteAction = function () {
    function CopyPasteAction() {
        (0, _classCallCheck3.default)(this, CopyPasteAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(CopyPasteAction, [{
        key: "copy",
        value: function copy(mapUniqueKey) {
            if (!mapUniqueKey) {
                return;
            }
            this.copyPaste.copyComponent = this.viewportAction.getComponentFullInfoByMapUniqueKey(mapUniqueKey);
        }
    }, {
        key: "paste",
        value: function paste(parentMapUniqueKey) {
            if (!parentMapUniqueKey) {
                return false;
            }
            if (!this.copyPaste.copyComponent) {
                return false;
            }
            var parentComponent = this.viewport.components.get(parentMapUniqueKey);
            if (!parentComponent.props.canDragIn) {
                return false;
            }
            var newCopyComponent = this.viewportAction.createCopyComponentWithNewUniqueKey(this.copyPaste.copyComponent, parentMapUniqueKey);
            var parentChildCount = this.viewport.components.get(parentMapUniqueKey).layoutChilds.length;
            this.viewportAction.addComboComponent(parentMapUniqueKey, newCopyComponent, parentChildCount);
            return true;
        }
    }]);
    return CopyPasteAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CopyPasteAction;
__decorate([gaea_editor_manager_1.inject('CopyPasteStore')], CopyPasteAction.prototype, "copyPaste", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportAction')], CopyPasteAction.prototype, "viewportAction", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportStore')], CopyPasteAction.prototype, "viewport", void 0);
__decorate([gaea_editor_manager_1.observable], CopyPasteAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('复制')], CopyPasteAction.prototype, "copy", null);
__decorate([gaea_editor_manager_1.action('粘贴')], CopyPasteAction.prototype, "paste", null);