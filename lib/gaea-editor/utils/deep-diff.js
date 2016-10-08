"use strict";

var UNCHANGED = '__UNCHANGED__';
var deepDiff = function deepDiff(obj1, obj2) {
    if (isFunction(obj1) || isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.';
    }
    if (isValue(obj1) || isValue(obj2)) {
        if (obj1 !== obj2) {
            return obj1;
        } else {
            return UNCHANGED;
        }
    }
    var diff = {};
    for (var key in obj1) {
        if (isFunction(obj1[key])) {
            continue;
        }
        var value2 = void 0;
        if ('undefined' != typeof obj2[key]) {
            value2 = obj2[key];
        }
        var diffResult = deepDiff(obj1[key], value2);
        if (diffResult !== UNCHANGED) {
            diff[key] = diffResult;
        }
    }
    return diff;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = deepDiff;
function isFunction(obj) {
    return {}.toString.apply(obj) === '[object Function]';
}
function isArray(obj) {
    return {}.toString.apply(obj) === '[object Array]';
}
function isObject(obj) {
    return {}.toString.apply(obj) === '[object Object]';
}
function isValue(obj) {
    return !isObject(obj) && !isArray(obj);
}