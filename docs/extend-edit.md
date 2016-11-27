# Customize your own generic plug-in editor

First of all you have a certain understanding of the [plug-in mechanism](<develop.md>).

## For example, you can customize the editing type of a time type

We set the edit type to time, that is, edit for the `edit='time'`, we will appear this type of custom editing:

```typescript
import * as React from 'react'
import {EditorManager} from 'gaea-edit'

@EditorManager.observer(['ViewportStore', 'ViewportAction', 'ApplicationAction'])
export default class EditorAttributeTime extends React.Component<any, any> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    // Will be rendered at `edit='time'`
    static position = 'editorAttributeTime'

    render() {
        if (this.props.ViewportStore.currentEditComponentMapUniqueKey === null) {
            return null
        }

        return (<div> show time </div>)
    }
}
```

And so on, if you want to render at `edit='abc'`, as long as the position is set to `editorAttributeAbc`.

Next, we inject `ViewportStore` and `ViewportAction`, Through `ViewportStore`, we can get from the `currentEditComponentMapUniqueKey` component is currently editing the key, from the `currentEditComponentInfo` to get the current component is editing the complete information.

Through the two core data, through the following code can change the value of any component of any field, of course, we change the currently being edited:

```typescript
this.props.ViewportAction.updateComponentProps(this.props.ViewportStore.currentEditComponentMapUniqueKey, [custom field], [custom value])
```