"use strict";

require("reflect-metadata");
var inversify_1 = require("inversify");
var inversify_inject_decorators_1 = require("inversify-inject-decorators");
var myKernel = new inversify_1.Kernel();

var _inversify_inject_dec = inversify_inject_decorators_1.default(myKernel);

var lazyInject = _inversify_inject_dec.lazyInject;

exports.lazyInject = lazyInject;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = myKernel;