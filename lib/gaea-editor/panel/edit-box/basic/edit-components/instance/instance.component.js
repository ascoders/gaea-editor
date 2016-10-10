"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var React = require('react');
var typings = require('./instance.type');
var mobx_react_1 = require('mobx-react');
require('./instance.css');
var EditComponentInstance = function (_React$Component) {
    _inherits(EditComponentInstance, _React$Component);

    function EditComponentInstance() {
        var _ref;

        _classCallCheck(this, EditComponentInstance);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditComponentInstance.__proto__ || Object.getPrototypeOf(EditComponentInstance)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(EditComponentInstance, [{
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