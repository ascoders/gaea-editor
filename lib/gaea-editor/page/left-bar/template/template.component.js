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
var ReactDOM = require('react-dom');
var typings = require('./template.type');
var mobx_react_1 = require('mobx-react');
var drag_list_1 = require('../../../utils/drag-list');
require('./template.css');
var TWO_COLUMN = "{\"name\":\"两列\",\"mapUniqueKey\":\"gaea-component-1475912221054-2\",\"componentInfo\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912210697-1\",\"layoutChilds\":[\"gaea-component-1475912222125-3\",\"gaea-component-1475912223600-4\"]},\"childs\":{\"gaea-component-1475912222125-3\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912221054-2\"},\"gaea-component-1475912223600-4\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912221054-2\"}}}";
var THREE_COLUMN = "{\"name\":\"3列\",\"mapUniqueKey\":\"gaea-component-1475912307384-2\",\"componentInfo\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912305457-1\",\"layoutChilds\":[\"gaea-component-1475912308194-3\",\"gaea-component-1475912309672-5\",\"gaea-component-1475912310663-6\"]},\"childs\":{\"gaea-component-1475912308194-3\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"},\"gaea-component-1475912309672-5\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"},\"gaea-component-1475912310663-6\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"}}}";
var FOUR_COLUMN = "{\"name\":\"4列\",\"mapUniqueKey\":\"gaea-component-1475912307384-2\",\"componentInfo\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912305457-1\",\"layoutChilds\":[\"gaea-component-1475912308194-3\",\"gaea-component-1475912309002-4\",\"gaea-component-1475912309672-5\",\"gaea-component-1475912310663-6\"]},\"childs\":{\"gaea-component-1475912308194-3\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"},\"gaea-component-1475912309002-4\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"},\"gaea-component-1475912309672-5\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"},\"gaea-component-1475912310663-6\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475912307384-2\"}}}";
var LEFT_IMAGE_RIGHT_TEXT = "{\"name\":\"左图右字\",\"mapUniqueKey\":\"gaea-component-1475893714294-2\",\"componentInfo\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475893709367-1\",\"layoutChilds\":[\"gaea-component-1475893715582-3\",\"gaea-component-1475893719087-4\"]},\"childs\":{\"gaea-component-1475893715582-3\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475893714294-2\",\"layoutChilds\":[\"gaea-component-1475893764790-5\"]},\"gaea-component-1475893764790-5\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-text\"},\"parentMapUniqueKey\":\"gaea-component-1475893715582-3\"},\"gaea-component-1475893719087-4\":{\"props\":{\"style\":{\"flexGrow\":\"1\"},\"gaeaUniqueKey\":\"gaea-layout\"},\"parentMapUniqueKey\":\"gaea-component-1475893714294-2\",\"layoutChilds\":[\"gaea-component-1475893766342-6\"]},\"gaea-component-1475893766342-6\":{\"props\":{\"style\":{},\"gaeaUniqueKey\":\"gaea-text\"},\"parentMapUniqueKey\":\"gaea-component-1475893719087-4\"}}}";
var Template = function (_React$Component) {
    _inherits(Template, _React$Component);

    function Template() {
        var _ref;

        _classCallCheck(this, Template);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Template.__proto__ || Object.getPrototypeOf(Template)).call.apply(_ref, [this].concat(args)));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Template, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            new drag_list_1.default(ReactDOM.findDOMNode(this.refs['dragContainer1']), this.props.viewport);
            new drag_list_1.default(ReactDOM.findDOMNode(this.refs['dragContainer2']), this.props.viewport);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", { className: "nt-editor-gaea-editor-gaea_editor-page-left_bar-template" }, React.createElement("div", { className: "title" }, "布局"), React.createElement("div", { className: "drag-container", ref: "dragContainer1" }, React.createElement("div", { className: "template-item", "data-source": TWO_COLUMN }, "两列"), React.createElement("div", { className: "template-item", "data-source": THREE_COLUMN }, "三列"), React.createElement("div", { className: "template-item", "data-source": FOUR_COLUMN }, "四列")), React.createElement("div", { className: "title" }, "卡片"), React.createElement("div", { className: "drag-container", ref: "dragContainer2" }, React.createElement("div", { className: "template-item", "data-source": LEFT_IMAGE_RIGHT_TEXT }, "左图右字")));
        }
    }]);

    return Template;
}(React.Component);
Template.defaultProps = new typings.Props();
Template = __decorate([mobx_react_1.inject('setting', 'viewport'), mobx_react_1.observer], Template);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Template;