"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Props = function Props() {
    (0, _classCallCheck3.default)(this, Props);

    this.title = 'GaeaEditor';
    this.version = '0.0.0';
    this.customComponents = [];
    this.isHideCustomComponents = false;
    this.height = 450;
    this.onSave = function () {};
    this.isReactNative = false;
    this.onGetPublishList = function () {};
    this.onSwitchVersion = function () {};
    this.onPreviewVersion = function () {};
    this.onPublish = function () {};
    this.explore = false;
};

exports.Props = Props;

var State = function State() {
    (0, _classCallCheck3.default)(this, State);

    this.currentVersion = '';
};

exports.State = State;