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
var dom_1 = require("../../utils/dom");

var TreeAction = function () {
    function TreeAction() {
        (0, _classCallCheck3.default)(this, TreeAction);

        this.observeClass = true;
    }

    (0, _createClass3.default)(TreeAction, [{
        key: "onInit",
        value: function onInit() {
            var _this = this;

            gaea_editor_manager_1.observe(this.ViewportStore, 'currentEditComponentMapUniqueKey', function (newValue, oldValue) {
                var selectClass = 'tree-selected';
                if (oldValue !== null) {
                    var prevEditDom = _this.tree.treeDoms.get(oldValue);
                    if (dom_1.hasClass(prevEditDom, selectClass)) {
                        dom_1.removeClass(prevEditDom, selectClass);
                    }
                }
                if (newValue !== null) {
                    var nextEditDom = _this.tree.treeDoms.get(newValue);
                    nextEditDom.className += " " + selectClass;
                }
            });
        }
    }, {
        key: "setTreeRootDom",
        value: function setTreeRootDom(dom) {
            this.tree.treeRootDom = dom;
        }
    }, {
        key: "addTreeDom",
        value: function addTreeDom(mapUniqueKey, dom) {
            this.tree.treeDoms.set(mapUniqueKey, dom);
        }
    }, {
        key: "removeTreeDom",
        value: function removeTreeDom(mapUniqueKey) {
            this.tree.treeDoms.delete(mapUniqueKey);
        }
    }]);
    return TreeAction;
}();

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TreeAction;
__decorate([gaea_editor_manager_1.inject('TreeStore')], TreeAction.prototype, "tree", void 0);
__decorate([gaea_editor_manager_1.inject('ViewportStore')], TreeAction.prototype, "ViewportStore", void 0);
__decorate([gaea_editor_manager_1.observable], TreeAction.prototype, "observeClass", void 0);
__decorate([gaea_editor_manager_1.action('设置树根节点')], TreeAction.prototype, "setTreeRootDom", null);
__decorate([gaea_editor_manager_1.action('新增树 dom')], TreeAction.prototype, "addTreeDom", null);
__decorate([gaea_editor_manager_1.action('移除树 dom')], TreeAction.prototype, "removeTreeDom", null);