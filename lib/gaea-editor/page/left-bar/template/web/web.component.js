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
var ReactDOM = require("react-dom");
var typings = require("./web.type");
var mobx_react_1 = require("mobx-react");
var drag_list_1 = require("../../../../utils/drag-list");
var TWO_COLUMN = "N4IgdghgtgpiBcJAkcodCUQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYArAE4AHMIAMANmniFolgCYMITt178BASTAAzDglA4AThxwBnSyHsDqAGzjxgAX0yNmBCTkVLSI/qxuENQcpAIgviA4ENaGALK4gWSUNHTh7Fw8fIIiEjLyyprCKiI6kdGxAMIAFoRuACaO8ADaDEyseoWGJVJyiipqGgDMOnkDBsViI+Xj6iyiIAC6CWwt7Z2gswXzQotlY6qr016Jtg5OLu6eoKYeAB4A4rYA7nTC8X59TLBHJhPosOoxOIJJIpQTpfBELIhXJguZFE6lUbKC4abQJQ76dHDM7YiZrJw2Oz7ZyuDxOF4wD7fX7/XoBRHA0JsiJRSGsmFpDIc7JcgmDBaY5Y4rTxbzeIA=";
var THREE_COLUMN = "N4IgdghgtgpiBcJCQcodCUQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYArAE4AHMIAM4hQGZZolpIwhO3XvwEBJMADMOCUDgBOHHAGcLIOwOoAbOPGABfTI2YEScipaRD9WVwhqDlIBEB8QHAgrAwBZXACySho6MPYuHj5BEQkZeQUANgAmYXLpEW0IqJiAYQALQlcAEwd4AG0GJlZdAoNiqTlFZTUNcu1c4f0isXGyqfUWcTnBvL1CoWXSydV12RAAXXi2dq6e0Hn8xf2SiaVjmcdrW1unF3dHE3cAA8AOI2ADudGEcV8gwyQWyoW2jWisXiiWSgjS+CImWCOW2Cz2Y0Or2mmmhA2YOxGS2eqzeGw+Nnsjmcbg8oABMBB4MhFLCcKyIUp4UiKIp6NS6Rx8OF912owOLzWGi08XlNKeKyOZNOngSzO+bL++q5PI4EMQUPVsJlQvxVORMQlSSl2MC9sRVMJirpOvWaq8XiAA===\n";
var FOUR_COLUMN = "N4IgdghgtgpiBcJDbaodCUQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYArAE4AHMIAM4xeOktpGEJ269+AgJJgAZhwSgcAJw44AzmZA2B1ADZx4wAL6ZGzAiXJUtIg+rM4Q1BykAiBeIDgQFnoAsrh+ZJQ0dCHsXDx8giISMvIKAGwATMKlasKaYRFRAMIAFoTOACZ28ADaDEys2nl6hVJyKio1CprZg7oFYqMlyko1td79OTr5QgvF4ysi5dMbs9sje0oTIgDMIAC6sWytHV2gM7lzO0VjlweK9pZrK8HE5XPYjK4AB4AcSsAHc6LVYiE0gFMsENvVItFYvFEoIUvgiOlAlkTh8zrsfstVOoYutmJshvNvksrsJau44lZbPZHC43KAITAYfDEfS+r5iWigpLQuFsRK8clUtKMrL3lthlS2QcNMjyVqWYt9rThEcuYDeVz+WCucLRRwEYgkQyIKj1WTGViokqEiqif5PRjGadtazTWp9W6mZ9ztT2bdLTzgbbBSAHbCneKDVKg6SQ/KGjjMMqCar8+i5bHKRHfrT9R4PEA";
var LEFT_IMAGE_RIGHT_TEXT = "N4IgdghgtgpiBcJBnuoP7VDPyodW0QBoRQgA4CqYAlgI4CuMA0jAJ4IgDmEMEAtAMYD2UBPMDDAAXDgEYALAHYArAE4AHOIAM0gEwBmaZImScIXv0HCRASTAAzHglAEATjwIBnWyGcj6AGzjxgAX1xWdhIKajpGRGDOLwh6HkoREECQAgh7UwBZQlCqWgYmaO4+ASFRPTklVQA2dXFq+QkDWPjEgGEAC1IvABNXeABtFjZOI1LTCoVlNS0dCVkDIrGTcqlK6Y1tXXFpEABdFK4u3v7QJZKVsTWp1U258QW/VMcXNw9vX1AIL1JmMDMRDAoP1DKYYPZkkERrlwgUoiMOC0EkkUmkMqJssQyHkIoUEcsylcZDcZls9M04sjOt0+gghudjITJlVSfdqvsUgzxqtiSy7tt2U8HE5Tu5PD5bJzodjYZFhuwOICAB4o3BorI5GX5OVcy7MjazbYLKUKgkTa58w0SXZCl6i94Sp6WHxKgDijgA7kxxAYAFaUDykSz0NqCQGiJjONJcGAcABGMBEHpgwgM31+/0BwKYMdE4Mh8ogMO1eIVSMSBfVGM1YRL8NNFyZFoNZKkFNaImpJzpheKjPNvJb90Ui3xjYH61uVvE8g5UIb/Z5k9Z2xHtpFb3FnxNRa1uPrnGVqtS6Q1WNr+97ZqXJP51oLuqbg6nrdn69eTwd2/nu4vcN75bHlWIiYsWl6PhOt7TrsuCAV2tKDFe443paZLqCoc5IYuRLLne6FuMKH6gF+bg9KQUYtEwzowEqaY/H8AJAiCuaAhCKRHkwSpKgAdFxvG0T+YH/kUHGoqe1bnjiwljth+ovvcs7+EpQA===";
var Web = function (_React$Component) {
    (0, _inherits3.default)(Web, _React$Component);

    function Web() {
        (0, _classCallCheck3.default)(this, Web);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Web.__proto__ || Object.getPrototypeOf(Web)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Web, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            new drag_list_1.default(ReactDOM.findDOMNode(this.refs['dragContainer1']), this.props.viewport);
            new drag_list_1.default(ReactDOM.findDOMNode(this.refs['dragContainer2']), this.props.viewport);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", null, React.createElement("div", { className: "drag-container", ref: "dragContainer1" }, React.createElement("div", { className: "template-item", "data-source": TWO_COLUMN }, "两列"), React.createElement("div", { className: "template-item", "data-source": THREE_COLUMN }, "三列"), React.createElement("div", { className: "template-item", "data-source": FOUR_COLUMN }, "四列")), React.createElement("div", { className: "title" }, "卡片"), React.createElement("div", { className: "drag-container", ref: "dragContainer2" }, React.createElement("div", { className: "template-item", "data-source": LEFT_IMAGE_RIGHT_TEXT }, "左图右字")));
        }
    }]);
    return Web;
}(React.Component);
Web.defaultProps = new typings.Props();
Web = __decorate([mobx_react_1.inject('setting', 'viewport', 'application'), mobx_react_1.observer], Web);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Web;