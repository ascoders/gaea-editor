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
var typings = require("./editor-attribute-instance.type");
var EditorManager = require("../../../gaea-editor-manager/gaea-editor-manager");
require("./editor-attribute-instance.css");
var EditorAttributeInstance = function (_React$Component) {
    (0, _inherits3.default)(EditorAttributeInstance, _React$Component);

    function EditorAttributeInstance() {
        (0, _classCallCheck3.default)(this, EditorAttributeInstance);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditorAttributeInstance.__proto__ || Object.getPrototypeOf(EditorAttributeInstance)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditorAttributeInstance, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.ComponentClass = this.props.ApplicationAction.getComponentClassByGaeaUniqueKey(this.props.ViewportStore.currentEditComponentInfo.props.gaeaUniqueKey);
        }
    }, {
        key: "handleApplyProps",
        value: function handleApplyProps(props) {
            var _this2 = this;

            Object.keys(props).forEach(function (key) {
                _this2.props.ViewportAction.updateCurrentEditComponentProps(key, props[key]);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var componentInstances = this.props.editInfo.instance.map(function (props, index) {
                var instanceElement = React.createElement(_this3.ComponentClass, props);
                return React.createElement("div", { key: index, onClick: _this3.handleApplyProps.bind(_this3, props), className: "instance-item" }, instanceElement);
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-components-editor_attribute_instance" }, componentInstances);
        }
    }]);
    return EditorAttributeInstance;
}(React.Component);
EditorAttributeInstance.defaultProps = new typings.Props();
EditorAttributeInstance.position = 'editorAttributeInstance';
EditorAttributeInstance = __decorate([EditorManager.observer(['ViewportStore', 'ViewportAction', 'ApplicationAction'])], EditorAttributeInstance);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditorAttributeInstance;