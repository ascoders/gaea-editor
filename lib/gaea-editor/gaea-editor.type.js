"use strict";

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Props = function Props() {
    (0, _classCallCheck3.default)(this, Props);

    this.plugins = [];
    this.commonComponents = [];
    this.customComponents = [];
    this.rootLayoutComponentUniqueKey = 'gaea-layout';
    this.defaultValue = null;
    this.defaultSetting = null;
    this.isReactNative = false;
    this.onSave = function () {};
    this.onPublish = function () {};
    this.onGetPublishList = function () {};
    this.onSwitchVersion = function () {};
    this.onPreviewVersion = function () {};
    this.currentVersion = '0.0.0';
    this.customOptions = null;
};

exports.Props = Props;

var State = function State() {
    (0, _classCallCheck3.default)(this, State);
};

exports.State = State;