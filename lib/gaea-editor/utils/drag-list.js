"use strict";
const Sortable = require("sortablejs");
class DragList {
    constructor(element, viewport) {
        Sortable.create(element, {
            animation: 150,
            group: {
                name: 'gaea-layout',
                pull: 'clone',
                put: false
            },
            sort: false,
            delay: 0,
            onStart: (event) => {
                this.lastDragStartIndex = event.oldIndex;
                viewport.startDragging('', 'source', true, null, event.oldIndex, event.item.dataset.source);
            },
            onEnd: (event) => {
                viewport.endDragging();
                if (event.clone.parentNode) {
                    element.removeChild(event.clone);
                    if (this.lastDragStartIndex === element.childNodes.length) {
                        element.appendChild(event.item);
                    }
                    else {
                        element.insertBefore(event.item, element.childNodes[this.lastDragStartIndex]);
                    }
                }
                else {
                }
            }
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DragList;
