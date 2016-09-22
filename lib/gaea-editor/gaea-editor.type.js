"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PropsGaea = function PropsGaea() {
    _classCallCheck(this, PropsGaea);

    this.gaeaName = '盖亚';
    this.gaeaIcon = 'square-o';
    this.gaeaUniqueKey = 'nt-editor-gaea';
};

exports.PropsGaea = PropsGaea;

var Props = function (_PropsGaea) {
    _inherits(Props, _PropsGaea);

    function Props() {
        var _ref;

        _classCallCheck(this, Props);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = Props.__proto__ || Object.getPrototypeOf(Props)).call.apply(_ref, [this].concat(args)));

        _this.title = 'GaeaEditor';
        _this.version = '0.0.0';
        _this.customComponents = [];
        _this.isHideCustomComponents = false;
        _this.height = 450;
        _this.onSave = function () {};
        _this.versionInit = function (saveVersion) {
            saveVersion([], false);
        };
        _this.onOnlineModalShow = function (callback) {
            callback([]);
        };
        _this.onOnlineClick = function (key) {};
        _this.onLoadMoreVersionClick = function () {};
        _this.onPublish = function () {};
        _this.getSourceFileList = function (folderId, callback) {
            var fileList = [];
            callback(fileList);
        };
        _this.addSourceFile = function (folderId, fileInfo, addSuccess) {
            addSuccess();
        };
        _this.isReactNative = false;
        return _this;
    }

    return Props;
}(PropsGaea);

exports.Props = Props;

var State = function State() {
    _classCallCheck(this, State);
};

exports.State = State;