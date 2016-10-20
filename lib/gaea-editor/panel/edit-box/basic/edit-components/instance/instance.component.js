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
var typings = require("./instance.type");
var mobx_react_1 = require("mobx-react");
require("./instance.css");
var EditComponentInstance = function (_React$Component) {
    (0, _inherits3.default)(EditComponentInstance, _React$Component);

    function EditComponentInstance() {
        (0, _classCallCheck3.default)(this, EditComponentInstance);

        var _this = (0, _possibleConstructorReturn3.default)(this, (EditComponentInstance.__proto__ || Object.getPrototypeOf(EditComponentInstance)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(EditComponentInstance, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            this.ComponentClass = this.props.application.getComponentByUniqueKey(this.componentInfo.props.gaeaUniqueKey);
        }
    }, {
        key: "handleApplyProps",
        value: function handleApplyProps(props) {
            var _this2 = this;

            this.props.viewport.prepareWriteHistory();
            Object.keys(props).forEach(function (key) {
                _this2.props.viewport.updateComponentValueWithNoHistory(key, props[key]);
            });
            this.props.viewport.writeHistory();
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            var componentInstances = this.props.editOption.instance.map(function (props, index) {
                var instanceElement = React.createElement(_this3.ComponentClass, props);
                return React.createElement("div", { key: index, onClick: _this3.handleApplyProps.bind(_this3, props), className: "instance-item" }, instanceElement);
            });
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-panel-edit_box-basic-edit_components-instance" }, componentInstances);
        }
    }]);
    return EditComponentInstance;
}(React.Component);
EditComponentInstance.defaultProps = new typings.Props();
EditComponentInstance = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], EditComponentInstance);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentInstance;