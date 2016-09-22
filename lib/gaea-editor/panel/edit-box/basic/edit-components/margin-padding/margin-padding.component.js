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
var typings = require('./margin-padding.type');
var mobx_react_1 = require('mobx-react');
var _ = require('lodash');
var index_1 = require('nt-web-margin-padding-editor');
var EditComponentText = function (_React$Component) {
    _inherits(EditComponentText, _React$Component);

    function EditComponentText() {
        var _ref;

        _classCallCheck(this, EditComponentText);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = EditComponentText.__proto__ || Object.getPrototypeOf(EditComponentText)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        _this.marginPaddingValues = {};
        _this.marginPaddingOldValue = {};
        return _this;
    }

    _createClass(EditComponentText, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.componentInfo = this.props.viewport.components.get(this.props.viewport.currentEditComponentMapUniqueKey);
            this.marginPaddingValues['marginLeft'] = this.componentInfo.props['marginLeft'];
            this.marginPaddingValues['marginTop'] = this.componentInfo.props['marginTop'];
            this.marginPaddingValues['marginRight'] = this.componentInfo.props['marginRight'];
            this.marginPaddingValues['marginBottom'] = this.componentInfo.props['marginBottom'];
            this.marginPaddingValues['paddingLeft'] = this.componentInfo.props['paddingLeft'];
            this.marginPaddingValues['paddingTop'] = this.componentInfo.props['paddingTop'];
            this.marginPaddingValues['paddingRight'] = this.componentInfo.props['paddingRight'];
            this.marginPaddingValues['paddingBottom'] = this.componentInfo.props['paddingBottom'];
            this.marginPaddingOldValue = _.cloneDeep(this.marginPaddingValues);
        }
    }, {
        key: "handleChange",
        value: function handleChange(name, value) {
            this.marginPaddingValues[name] = value;
            this.props.viewport.updateComponentOptionsValueByOptions(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editOption, this.marginPaddingValues);
        }
    }, {
        key: "handleFinalChange",
        value: function handleFinalChange(name, value) {
            this.props.viewport.updateComponentOptionsValueByOptions(this.props.viewport.currentEditComponentMapUniqueKey, this.props.editOption, this.marginPaddingOldValue);
            this.marginPaddingValues[name] = value;
            this.marginPaddingOldValue = _.cloneDeep(this.marginPaddingValues);
            this.props.viewport.updateComponentOptionsValue(this.props.editOption, this.marginPaddingValues);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(index_1.default, { size: 160, marginLeft: this.componentInfo.props['marginLeft'], marginTop: this.componentInfo.props['marginTop'], marginRight: this.componentInfo.props['marginRight'], marginBottom: this.componentInfo.props['marginBottom'], paddingLeft: this.componentInfo.props['paddingLeft'], paddingTop: this.componentInfo.props['paddingTop'], paddingRight: this.componentInfo.props['paddingRight'], paddingBottom: this.componentInfo.props['paddingBottom'], onChange: this.handleChange.bind(this), onFinalChange: this.handleFinalChange.bind(this) });
        }
    }]);

    return EditComponentText;
}(React.Component);
EditComponentText.defaultProps = new typings.Props();
EditComponentText = __decorate([mobx_react_1.inject('viewport'), mobx_react_1.observer], EditComponentText);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EditComponentText;
//# sourceMappingURL=margin-padding.component.js.map