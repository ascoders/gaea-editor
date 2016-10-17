"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sortable = require("sortablejs");

var DragList = function DragList(element, viewport) {
    var _this = this;

    _classCallCheck(this, DragList);

    Sortable.create(element, {
        animation: 150,
        group: {
            name: 'gaea-layout',
            pull: 'clone',
            put: false
        },
        sort: false,
        delay: 0,
        onStart: function onStart(event) {
            _this.lastDragStartIndex = event.oldIndex;
            viewport.startDragging('', 'source', true, null, event.oldIndex, event.item.dataset.source);
        },
        onEnd: function onEnd(event) {
            viewport.endDragging();
            if (event.clone.parentNode) {
                element.removeChild(event.clone);
                if (_this.lastDragStartIndex === element.childNodes.length) {
                    element.appendChild(event.item);
                } else {
                    element.insertBefore(event.item, element.childNodes[_this.lastDragStartIndex]);
                }
            } else {}
        }
    });
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DragList;