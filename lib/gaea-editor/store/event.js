"use strict";
const event_system_1 = require('../event-system/event-system');
class EventSystem extends event_system_1.default {
    constructor(...args) {
        super(...args);
        this.viewportOrTreeComponentMouseOver = 'viewportOrTreeComponentMouseOver';
        this.viewportOrTreeRootComponentMouseLeave = 'viewportOrTreeRootComponentMouseLeave';
        this.changeComponentSelectStatusEvent = 'changeComponentSelectStatus';
        this.onSave = 'onSave';
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EventSystem;
