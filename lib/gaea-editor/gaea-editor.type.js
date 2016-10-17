"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Props = function Props() {
    _classCallCheck(this, Props);

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
};

exports.Props = Props;

var State = function State() {
    _classCallCheck(this, State);

    this.currentVersion = '';
};

exports.State = State;