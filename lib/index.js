"use strict";

require('gaea-model');
var LZString = require("lz-string");
var gaea_editor_component_1 = require("./gaea-editor/gaea-editor.component");
exports.GaeaEditor = gaea_editor_component_1.default;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = gaea_editor_component_1.default;
var LZDecode = LZString.decompressFromBase64;
exports.decode = LZDecode;
var LZEncode = LZString.compressToBase64;
exports.encode = LZEncode;