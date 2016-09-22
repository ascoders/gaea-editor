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
var typings = require('./drag-source.type');
var mobx_react_1 = require('mobx-react');
require('./drag-source.css');
var DragSourceComponent = function (_React$Component) {
    _inherits(DragSourceComponent, _React$Component);

    function DragSourceComponent() {
        var _ref;

        _classCallCheck(this, DragSourceComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = DragSourceComponent.__proto__ || Object.getPrototypeOf(DragSourceComponent)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(DragSourceComponent, [{
        key: "handleMouseEnter",
        value: function handleMouseEnter() {}
    }, {
        key: "handleMouseLeave",
        value: function handleMouseLeave() {}
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-sidebar_tools-tools-components drag-box", onMouseEnter: this.handleMouseEnter.bind(this), onMouseLeave: this.handleMouseLeave.bind(this) }, this.props.children);
        }
    }]);

    return DragSourceComponent;
}(React.Component);
DragSourceComponent.defaultProps = new typings.Props();
DragSourceComponent = __decorate([mobx_react_1.observer], DragSourceComponent);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DragSourceComponent;
//# sourceMappingURL=drag-source.component.js.map