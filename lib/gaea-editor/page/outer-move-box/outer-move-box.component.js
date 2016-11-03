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
var typings = require("./outer-move-box.type");
var mobx_react_1 = require("mobx-react");
require("./outer-move-box.css");
var OuterMoveBox = function (_React$Component) {
    (0, _inherits3.default)(OuterMoveBox, _React$Component);

    function OuterMoveBox() {
        (0, _classCallCheck3.default)(this, OuterMoveBox);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OuterMoveBox.__proto__ || Object.getPrototypeOf(OuterMoveBox)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(OuterMoveBox, [{
        key: "render",
        value: function render() {
            if (this.props.viewport.isMovingComponent || !this.props.viewport.viewportHoverComponentSpec.hovering) {
                return null;
            }
            var width = this.props.viewport.viewportHoverComponentSpec.width - 4;
            if (width < 0) {
                width = 0;
            }
            var height = this.props.viewport.viewportHoverComponentSpec.height - 4;
            if (height < 0) {
                height = 0;
            }
            var style = {
                left: this.props.viewport.viewportHoverComponentSpec.left,
                top: this.props.viewport.viewportHoverComponentSpec.top,
                width: width,
                height: height
            };
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-outer_move_box", style: style });
        }
    }]);
    return OuterMoveBox;
}(React.Component);
OuterMoveBox.defaultProps = new typings.Props();
OuterMoveBox = __decorate([mobx_react_1.inject('viewport', 'application'), mobx_react_1.observer], OuterMoveBox);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = OuterMoveBox;