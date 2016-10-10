import Event from '../event-system/event-system';
export default class EventSystem extends Event {
    viewportOrTreeComponentMouseOver: string;
    viewportOrTreeRootComponentMouseLeave: string;
    changeComponentSelectStatusEvent: string;
    onSave: string;
    editorPanelShadowClose: string;
}
