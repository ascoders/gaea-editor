/**
 * Plugin
 */
declare interface IPlugin {
    /**
     * Position insert to editor
     */
    position: string
    /**
     * React class
     */
    class: any
    /**
     * Plugin's action
     */
    actions?: {
        [name: string]: any
    }
    /**
     * Plugin's store
     */
    stores?: {
        [name: string]: any
    }
}

/**
 * Drag source's props should extends this interface
 */
declare interface IGaeaProps extends React.HTMLProps<any> {
    gaeaSetting: IGaeaSetting
}

declare interface IGaeaSetting {
    /**
     * Unique key
     */
    key: string
    /**
     * Custom show name
     */
    name: string
    /**
     * Edit infos
     */
    editor?: Array<string | IEditor>
    /**
     * Is in preview mode
     */
    isPreview?: boolean
    /**
     * Container can be dragged into component
     */
    isContainer?: boolean
}

declare interface IEditor {
    /**
     * Which field to control?
     * EX. text, size, user.nickname
     */
    field: string
    /**
     * Which Editor want to show?
     * Basic type like `text` `number`, or custom editor like `layout`
     */
    type: string
    /**
     * Show label
     */
    label: string
}
