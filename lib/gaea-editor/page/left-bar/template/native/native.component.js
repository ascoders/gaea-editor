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
var React = require("react");
var ReactDOM = require("react-dom");
var typings = require("./native.type");
var mobx_react_1 = require("mobx-react");
var drag_list_1 = require("../../../../utils/drag-list");
var NAV_BAR = "N4IgdghgtgpiBcJA/2oKiDCG5iANCKEAOAqmAJYCOArjANIwCeCIA5hDBALQDGA9lHl2DDAAXNgEYALAHYAbBICc4xZICs0tsqwhuvfoKEBJMADMuCUHgBOXPAGczIG0NoAbOPFARnxRmH1CYUHaIHHowFpoAFjDeEUII4srYAEZcFgAmYQDCXM6pDBaMSRAAFABMpeKYAATllTUV1aIAlJop6WEAQlxCQjwA6sRpQhEIosmpGRZdPTwAyk6uDDY5gyAAvtjMrERklDT0iFvszhC0XORxGyB4EBZ6ALL4OxTUdAxHnDx8AsJiUrLiOSlAAcwJkkjYAGZNCczhdMhFiM40kEANpMFjsbTfPR/GTyRRSVRsaSaD7Y3S/CT4wGElRqYFkzGfHQ/ETUgEKJTE0QABhAAF0rhxEcigqByV9Kez/gTuWpSe5rlZbPZHC43KAjK4AB6jbBRGJxeCKbAAd0GwwQvKuR2eezeh2ZsPOl2wNzuwkehBIL3272ZFLZeM5dOJGmwLvhopRCHRktZuI5cqJakkgttgalweTtPlbHTSss1nFDgWmpAhsYsXiiRAFqGIxNyiukFgDGI3DAHQgHAA1gA5CAAN3uxAEHRO/aZ219DoO9ZgRggYDYnf463dtweTznrwXCZxVNledTJM3GNYLKPMppXLPjKLKtL6sWSu1MD18DGIAAVuRHGIIxaGyYQ9AYEIwPCbBPG8Xx/ECCDQmg+tLSbG1Nkxe19wDK8ozda5ty9Xddhwp0ryDJMT3vel1BhU5XQRJFY3geMs0TY87zDNQ5AzTCKOzKiuPzXinxLNVy3sExhD6aJq2NEBJF5flsGkoRZmIAAvNxRGBTNZ1I/1yPYfwdQIj0dx9QzHUvLFBM40N80ZfS7I429HLPPl7GLVUlVfCsPy/H9/0A4DQP8YQGECthBDSSI5JrE1KlQxtrRc7CjNsth8IvCziKsv0bMPaUQxTWiIxAfCmLFOMssohyyp5UQZ1cm9StPWjRFKPi6vs9zGrUURmrE3zQH8+wq0ShJzTQ2t0r3TKzSXFc1y7XKiKEb0MqK9i2tzGieX5FzrxK/buLEbqRpfSSlUm41ppSq1m1baA3BATswAACR4GAABVrAHGAzSSFrtoXJbl1XdcwHWz1NpIwqD1207qPOry1gxoA=";
var TOPIC_CARD = "N4IgdghgtgpiBcJC70YDIzCGyocScQBoRQgA4CqYAlgI4CuMA0jAJ4IgDmEMEAtAMYD2UBPMDDAAXDgEYALAHYAbAAZp8gBzKAzLNkAmDlpwhe/QcJEBJMADMeCUAQBOPAgGcbIJyPoAbOPFAXvAB4AIqR2MFwipIJMvJ6UUGD6BBAAJimkYMwAMjAWIgji8rjJaRnMACqOBUUgJemZAEqkzAAW+fCFxan1zABCPCIifNUAvris7CQU1HSMiBOcnhD0PJT5Y7UQYaIAsoRTVLQMTAvcfAJCohIyCkrKsspakvIS+ksrawDCLaSeKS7wADaLDYnEMFxM1zkihUykkkgeHDU+lO4OMVyk0LuygArFoFBxJCjQWcjJcxJjbrDZOI1JIODiQABdDZcH5/AGgVHndEUm4w1TwxHI3y1BzOVzuLw+UAQTzNMCmEQwKAAgwmGB2EAbBYHGbHeYk96rdZdbYiPbEMiHWYnElo8lQqmqDTaXRvZYm76/f4IYHcsmQykCgCcahDkjUHFkzJ19p5juDdzDEajMdF9kcnLcHm8risogA6jBmm0mEp5PoCyIAMqkABePnEsg2yoC7RAgDj/QDmSoAZxMAVyqAWXlAIg6gGdNQAhboBl1UAz+mAAHNAO6KgA4VQCo+oBspUA+P/EybW/VzEHsDht02bc2WvVHPcBiEY/nYoXKJHa8bxwM3rGwvEEokZ8XZqV5jNujKSoCAQHEulKTJ+kGYZ4BxONt2mC87QPY01ifE8TDPHdkMNA8HSDW9YVdHQ9FwNCRG9Dk/X3MEE0I98QxxWQZGkDhlC3OjXz5LFClpeQtHECRK2ffD6LfW5Ci0DQ1AfKRY1Erjrx4qkmJY6Q2I4n8s0lXMZRAAArSh3FICx6E+QRlVEGINS1XA5QVJUVTVLhbKSIDMhyPIEDUCCehAny/LKJpWnaXzNkgvoBiGKBApAAAjCAuAAa2YBxKDAFILM8HgtUQOxmESgAKLQtGUbAAAJSvKqqysq8QAEp9Hi3KUk1aCYq8kQGlSUhjLA3AWrsNq7A6vgQraHr0n6uDBtazUQK6qa+oBcCEvmuwQIm7repm+DFPPW08MWT10I2ZJT32HCjto0llKdAVcXxF4iXI07KPZX0gVugiJJhENbhDNiQwUn7xJU/7AeB1xMwlUV/xlVsYHbJhAAsIwAUe04w6DVuo8MIurCrqQm6r15B6lDU1j2Iw0nE1vPi1AEoTChh39dOlVwjJMsyLNEEwbL5uyQAc5hFWVVUBeVIW6jKLq4plzIAvgcKFeYbb5Y8qKYNi5XcHwAqMjl2aEqS1L0sy7LcqYAriuqyq7dqmrGuajaxqgJbdtWubhva6LxtLHbpq99afc2xwPaDgaQ5GraA+WvaEIgbHLyNd78a2QmrWJnHaYY50nq/D0Pg+n0AX9F97qTBmmYkcRQdzv7pGrwTa9ZnT4b0mwkZRxB0cADRUseunOSTx86M92ImbWHsTuPJ5vmcrRO7rJquBJkuTv1sNmO450UuciHnLP5xBXMF/QRbF5zJc1dzIqNlXNaVh/IvV3WIp6N24v15hDdydo1sSilNKqwLY8BynlEANsIAlTqo7e2sDnbexGm7COK0o5DWQX7KA2147BwwQtcOf9cHoI2rHUKxC4KJ2TihE6xd06XSzlPFOM9K5EVUJ+F6RcvSfTLmDWeq9pKyFkhIRkLJFLLzprxNeQi5KMm0nDUACMu64DxogQA8EbdkHtnZhnBR5mkztQ46Ei86KCkuva4NMK4rzYfcWk9I5Fb3boozuooL5OQlifNyVCh46I4BRehBifE0OMY3YimhSJcK+DwmiDcIbJhxOIaQOhpD1ysZI50TFEnJLbgonMu9QCxCtvlQq0DaRO1kvVCpFVEEgGrHWRsBQtDdw7LSHEgAuuUAM6KgALmwqgAOgqrIaQgAqOUAHtqgBYTS0Uw4JejMIT0YbuYJv04nUjsQybUIwRhAA=";
var TAG = "N4IgdghgtgpiBcJDgFoP28QBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYAbAAZxw8QCZp0gBzCWAZmkYQnbr34CAkmABmHBKBwAnDjgDOlkPYHUANnHigAVqReFTagBhXgFDOjZDGGsdCDdCejAjMKhHREjBaJ0cCAATXMIwegAZGFMBBA1MHPzC+gAVO0rqvIKigCUEgAsK+CqQGrb6ACEOAQEuZpAAIwg2AGt6W1IwXJC3DhjEa3pZgAoFBRV0AAJD47Oj0+EASh1pzdzo0fGuUvL2vMI/BABWTAe1ie1heEygnXoPU+BR+8H+M0e0UaOHeAmh3zS8MBwOREKhX1hvwAvphGMwCCRyFRaIgyaw3BBqBxSBUSQMINZDABZXAUsiUGh0OnsLg8PiCEQSGRyRTKNQsBQATh0DKZLKCXUIblyaQA2gwmKw9GLDJKpLJ5EpVOoNMIQABdNlsTXatKgYXGgwSsTmmVW+W2pw2Oxu5yuDyWNlhAAevRAgAsIwAo9jo6XyqYLaYaWDHWS1OYIefgiPzqUKs57xUIfdLLXKbdoiY2gA===";
var BUTTON = "N4IgdghgtgpiBcJCQxoOpSQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYAbAAYAHNOnCxAZmEsATBhCduvfgICSYAGYcEoHACcOOAM7mQtgdQA2ceKABWpJ4WPUAYV4BfTo2fRhLLQgXQnowAxCoe0RwwUitHAgAE2zCMHoAGRhjAQRhaUws3Pz6ABUbBHEqnLyCgCU4gAsy+AqWmoKAIQ4BAS4mzAAjDktsyJGxrmLS9pzCH3KAVmnZ+ctF8ahO+h61vM2+nZAZuciGnBWBc42U4Wvb/YeTs/XL992d0sQRcszolnoUwgAAphLIdgACOGI5HoJEASi0nwWoyOAHVCNkBF1yoD9j8BASiSS+mT7jYqcTSTc9pEnoyacI6ZYngBlZxuOi2DixbJY1mWB781zuRwiwnioEU6WCxDC0WK/aHLgq2XqhUAX0wjGYBBI5CotEQJtYLgg1A4pDKRpAWUs+gAsrgzWRKDQ6Db2FweHxBCIJDJ5ApZEpJCItHaHU6Al1CC5sikANoMJisHQh/ThqRyBRKUSqFjKEAAXRdbFT6ZSoED+b0YbExajZYrVY8rusdgcThl5hdIQAHr0QIBwC0AY4qoLQ2n0W/3W3MsCfOlruwRe/BEX2WgPr1uhoQdyOllRqTQGu9AA";
var Native = function (_React$Component) {
    _inherits(Native, _React$Component);

    function Native() {
        _classCallCheck(this, Native);

        var _this = _possibleConstructorReturn(this, (Native.__proto__ || Object.getPrototypeOf(Native)).apply(this, arguments));

        _this.state = new typings.State();
        return _this;
    }

    _createClass(Native, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            new drag_list_1.default(ReactDOM.findDOMNode(this.refs['dragContainer1']), this.props.viewport);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement("div", null, React.createElement("div", { className: "drag-container", ref: "dragContainer1" }, React.createElement("div", { className: "template-item", "data-source": NAV_BAR }, "导航条"), React.createElement("div", { className: "template-item", "data-source": TOPIC_CARD }, "话题卡片"), React.createElement("div", { className: "template-item", "data-source": TAG }, "标签"), React.createElement("div", { className: "template-item", "data-source": BUTTON }, "按钮")));
        }
    }]);

    return Native;
}(React.Component);
Native.defaultProps = new typings.Props();
Native = __decorate([mobx_react_1.inject('setting', 'viewport', 'application'), mobx_react_1.observer], Native);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Native;