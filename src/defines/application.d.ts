/**
 * Plugin
 */
declare interface Plugin {
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
declare interface GaeaProps extends React.HTMLProps<any> {
    gaeaSetting: GaeaSetting
}

declare interface GaeaSetting {
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
    editor?: Array<string>
    /**
     * Is in preview mode
     */
    isPreview?: boolean
    /**
     * Container can be dragged into component
     */
    isContainer?: boolean
}