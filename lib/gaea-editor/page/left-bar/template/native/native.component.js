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
var typings = require("./native.type");
var mobx_react_1 = require("mobx-react");
var drag_list_1 = require("../../../../utils/drag-list");
var NAV_BAR = "N4IgdghgtgpiBcJA/2oKiDCG5iANCKEAOAqmAJYCOArjANIwCeCIA5hDBALQDGA9lHl2DDAAXNgEYALAHYAbBICc4xZICs0tsqwhuvfoKEBJMADMuCUHgBOXPAGczIG0NoAbOPFARnxRmH1CYUHaIHHowFpoAFjDeEUII4srYAEZcFgAmYQDCXM6pDBaMSRAAFABMpeKYAATllTUV1aIAlJop6WEAQlxCQjwA6sRpQhEIosmpGRZdPTwAyk6uDDY5gyAAvtjMrERklDT0iFvszhC0XORxGyB4EBZ6ALL4OxTUdAxHnDx8AsJiUrLiOSlAAcwJkkjYAGZNCczhdMhFiM40kEANpMFjsbTfPR/GTyRRSVRsaSaD7Y3S/CT4wGElRqYFkzGfHQ/ETUgEKJTE0QABhAAF0rhxEcigqByV9Kez/gTuWpSe5rlZbPZHC43KAjK4AB6jbBRGJxeCKbAAd0GwwQvKuR2eezeh2ZsPOl2wNzuwkehBIL3272ZFLZeM5dOJGmwLvhopRCHRktZuI5cqJakkgttgalweTtPlbHTSss1nFDgWmpAhsYsXiiRAFqGIxNyiukFgDGI3DAHQgHAA1gA5CAAN3uxAEHRO/aZ219DoO9ZgRggYDYnf463dtweTznrwXCZxVNledTJM3GNYLKPMppXLPjKLKtL6sWSu1MD18DGIAAVuRHGIIxaGyYQ9AYEIwPCbBPG8Xx/ECCDQmg+tLSbG1Nkxe19wDK8ozda5ty9Xddhwp0ryDJMT3vel1BhU5XQRJFY3geMs0TY87zDNQ5AzTCKOzKiuPzXinxLNVy3sExhD6aJq2NEBJF5flsGkoRZmIAAvNxRGBTNZ1I/1yPYfwdQIj0dx9QzHUvLFBM40N80ZfS7I429HLPPl7GLVUlVfCsPy/H9/0A4DQP8YQGECthBDSSI5JrE1KlQxtrRc7CjNsth8IvCziKsv0bMPaUQxTWiIxAfCmLFOMssohyyp5UQZ1cm9StPWjRFKPi6vs9zGrUURmrE3zQH8+wq0ShJzTQ2t0r3TKzSXFc1y7XKiKEb0MqK9i2tzGieX5FzrxK/buLEbqRpfSSlUm41ppSq1m1baA3BATswAACR4GAABVrAHGAzSSFrtoXJbl1XdcwHWz1NpIwqD1207qPOry1gxoA=";
var TOPIC_CARD = "N4IgdghgtgpiBcJC70YDIzCGyocScQBoRQgA4CqYAlgI4CuMA0jAJ4IgDmEMEAtAMYD2UBPMDDAAXDgEYALAHYAbAAZp8gBzKAzLNkAmDlpwhe/QcJEBJMADMeCUAQBOPAgGcbIJyPoAbOPFAXvAB4AIqR2MFwipIJMvJ6UUGD6BBAAJimkYMwAMjAWIgji8rjJaRnMACqOBUUgJemZAEqkzAAW+fCFxan1zABCPCIifNUAvris7CQU1HSMiBOcnhD0PJT5Y7UQYaIAsoRTVLQMTAvcfAJCohIyCkrKsspakvIS+ksrawDCLaSeKS7wADaLDYnEMFxM1zkihUykkkgeHDU+lO4OMVyk0LuygArFoFBxJCjQWcjJcxJjbrDZOI1JIODiQABdDZcH5/AGgVHndEUm4w1TwxHI3y1BzOVzuLw+UAQTzNMCmEQwKAAgwmGB2EAbBYHGbHeYk96rdZdbYiPbEMiHWYnElo8lQqmqDTaXRvZYm76/f4IYHcsmQykCgCcahDkjUHFkzJ19p5juDdzDEajMdF9kcnLcHm8risogA6jBmm0mEp5PoCyIAMqkABePnEsg2yoC7RAgDj/QDmSoAZxMAVyqAWXlAIg6gGdNQAhboBl1UAz+mAAHNAO6KgA4VQCo+oBspUA+P/EybW/VzEHsDht02bc2WvVHPcBiEY/nYoXKJHa8bxwM3rGwvEEokZ8XZqV5jNujKSoCAQHEulKTJ+kGYZ4BxONt2mC87QPY01ifE8TDPHdkMNA8HSDW9YVdHQ9FwNCRG9Dk/X3MEE0I98QxxWQZGkDhlC3OjXz5LFClpeQtHECRK2ffD6LfW5Ci0DQ1AfKRY1Erjrx4qkmJY6Q2I4n8s0lXMZRAAArSh3FICx6E+QRlVEGINS1XA5QVJUVTVLhbKSIDMhyPIEDUCCehAny/LKJpWnaXzNkgvoBiGKBApAAAjCAuAAa2YBxKDAFILM8HgtUQOxmESgAKLQtGUbAAAJSvKqqysq8QAEp9Hi3KUk1aCYq8kQGlSUhjLA3AWrsNq7A6vgQraHr0n6uDBtazUQK6qa+oBcCEvmuwQIm7repm+DFPPW08MWT10I2ZJT32HCjto0llKdAVcXxF4iXI07KPZX0gVugiJJhENbhDNiQwUn7xJU/7AeB1xMwlUV/xlVsYHbJhAAsIwAUe04w6DVuo8MIurCrqQm6r15B6lDU1j2Iw0nE1vPi1AEoTChh39dOlVwjJMsyLNEEwbL5uyQAc5hFWVVUBeVIW6jKLq4plzIAvgcKFeYbb5Y8qKYNi5XcHwAqMjl2aEqS1L0sy7LcqYAriuqyq7dqmrGuajaxqgJbdtWubhva6LxtLHbpq99afc2xwPaDgaQ5GraA+WvaEIgbHLyNd78a2QmrWJnHaYY50nq/D0Pg+n0AX9F97qTBmmYkcRQdzv7pGrwTa9ZnT4b0mwkZRxB0cADRUseunOSTx86M92ImbWHsTuPJ5vmcrRO7rJquBJkuTv1sNmO450UuciHnLP5xBXMF/QRbF5zJc1dzIqNlXNaVh/IvV3WIp6N24v15hDdydo1sSilNKqwLY8BynlEANsIAlTqo7e2sDnbexGm7COK0o5DWQX7KA2147BwwQtcOf9cHoI2rHUKxC4KJ2TihE6xd06XSzlPFOM9K5EVUJ+F6RcvSfTLmDWeq9pKyFkhIRkLJFLLzprxNeQi5KMm0nDUACMu64DxogQA8EbdkHtnZhnBR5mkztQ46Ei86KCkuva4NMK4rzYfcWk9I5Fb3boozuooL5OQlifNyVCh46I4BRehBifE0OMY3YimhSJcK+DwmiDcIbJhxOIaQOhpD1ysZI50TFEnJLbgonMu9QCxCtvlQq0DaRO1kvVCpFVEEgGrHWRsBQtDdw7LSHEgAuuUAM6KgALmwqgAOgqrIaQgAqOUAHtqgBYTS0Uw4JejMIT0YbuYJv04nUjsQybUIwRhAA=";
var TAG = "N4IgdghgtgpiBcJDgFoP28QBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHZxABgDMATgBsc8aNHCWcjCE7de/AQEkwAMw4JQOAE4ccAZ3MhbA6gBs48UACtSTwseoAwrwC+nRs+jCWWhAuhPRgBiFQ9ojhgpFaOBAAJtmEYPQAMjDGAggymFm5+fQAKjbllTl5BQBKcQAWZfAVIFUt9ABCHAICXI1YEJb0+cWlCACsmABGEGwA1vTWpGDZQS4cUYjTqwAUAEznABzoAASXN/fXd8IAlFrLh9mRw6NccwJWjlCD5Fisvj8RmMoO16F0gXlQfAliBPpZvpZ6jgAQiQSkUWiMVjYfDgUiFgBfTCMZgEEjkKi0RA01guCDUDikMpUkBsjlcgIdQgubIpADaDCYrB0PD4ghEEmk8iUKjUIikIAAuk1LPoALK4OlkSg0Ogs9hcWX6BWSWSKZSqdQKEA8thCkUpUDmmV6eViW3Kh1q4Qajx9ax2BxOVzuYA8kIAD26IEAKPaADRUtCyjQzTcypSxE9ydfrDURjYyzfmfXKhP6lfbVepNBSW0A===";
var BUTTON = "N4IgdghgtgpiBcJCQxoOpSQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYAbAAYAHNOnCxAZmEsATBhCduvfgICSYAGYcEoHACcOOAM7mQtgdQA2ceKABWpJ4WPUAYV4BfTo2fRhLLQgXQnowAxCoe0RwwUitHAgAE2zCMHoAGRhjAQRhaUws3Pz6ABUbBHEqnLyCgCU4gAsy+AqWmoKAIQ4BAS4mzAAjDktsyJGxrmLS9pzCH3KAVmnZ+ctF8ahO+h61vM2+nZAZuciGnBWBc42U4Wvb/YeTs/XL992d0sQRcszolnoUwgAAphLIdgACOGI5HoJEASi0nwWoyOAHVCNkBF1yoD9j8BASiSS+mT7jYqcTSTc9pEnoyacI6ZYngBlZxuOi2DixbJY1mWB781zuRwiwnioEU6WCxDC0WK/aHLgq2XqhUAX0wjGYBBI5CotEQJtYLgg1A4pDKRpAWUs+gAsrgzWRKDQ6Db2FweHxBCIJDJ5ApZEpJCItHaHU6Al1CC5sikANoMJisHQh/ThqRyBRKUSqFjKEAAXRdbFT6ZSoED+b0YbExajZYrVY8rusdgcThl5hdIQAHr0QIBwC0AY4qoLQ2n0W/3W3MsCfOlruwRe/BEX2WgPr1uhoQdyOllRqTQGu9AA";
var TieziCard = "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=";
var Native = function (_React$Component) {
    (0, _inherits3.default)(Native, _React$Component);

    function Native() {
        (0, _classCallCheck3.default)(this, Native);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Native.__proto__ || Object.getPrototypeOf(Native)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    (0, _createClass3.default)(Native, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            new drag_list_1.default(ReactDOM.findDOMNode(this.refs['dragContainer1']), this.props.viewport);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", null, React.createElement("div", { className: "drag-container", ref: "dragContainer1" }, React.createElement("div", { className: "template-item", "data-source": NAV_BAR }, "导航条"), React.createElement("div", { className: "template-item", "data-source": TOPIC_CARD }, "话题卡片"), React.createElement("div", { className: "template-item", "data-source": TAG }, "标签"), React.createElement("div", { className: "template-item", "data-source": BUTTON }, "按钮"), React.createElement("div", { className: "template-item", "data-source": TieziCard }, "帖子卡片")));
        }
    }]);
    return Native;
}(React.Component);
Native.defaultProps = new typings.Props();
Native = __decorate([mobx_react_1.inject('setting', 'viewport', 'application'), mobx_react_1.observer], Native);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Native;