"use strict";

var mobx_react_1 = require("mobx-react");
exports.observer = mobx_react_1.observer;
exports.reactInject = mobx_react_1.inject;
var mobx_1 = require("mobx");
exports.action = mobx_1.action;
exports.observable = mobx_1.observable;
exports.computed = mobx_1.computed;
exports.transaction = mobx_1.transaction;
exports.extendObservable = mobx_1.extendObservable;
var kernel_1 = require("../gaea-editor/utils/kernel");
exports.lazyInject = kernel_1.lazyInject;
var inversify_1 = require("inversify");
exports.injectable = inversify_1.injectable;
var index_1 = require('inject-instance');
exports.inject = index_1.inject;
exports.positions = {
    navbarLeft: 'navbarLeft',
    navbarRight: 'navbarRight',
    mainToolTop: 'mainToolTop',
    mainToolBottom: 'mainToolBottom'
};
var application_1 = require("../gaea-editor/actions/application");
exports.ApplicationAction = application_1.default;
var event_1 = require("../gaea-editor/actions/event");
exports.EventAction = event_1.default;
var viewport_1 = require("../gaea-editor/actions/viewport");
exports.ViewportAction = viewport_1.default;
var application_2 = require("../gaea-editor/stores/application");
exports.ApplicationStore = application_2.default;
var event_2 = require("../gaea-editor/stores/event");
exports.EventStore = event_2.default;
var viewport_2 = require("../gaea-editor/stores/viewport");
exports.ViewportStore = viewport_2.default;