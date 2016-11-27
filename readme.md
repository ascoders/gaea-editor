# GaeaEditor

A scalable web page editor.

- **Adaptation**: Support all react components. Add a few lines of configuration, you can let your components in the edit menu display, and can be dragged into the view area, and edit its properties.
- **Expand**: Support plug-ins to expand the editor for any function. Plug-ins can be inserted into any part of the editor, plug-ins can also provide slots for other plug-ins, plug-ins can create and share data flow editor, call the editor arbitrary function.

# Description

Editor can be divided into menu area and view area, any react component can be used as a menu item, and be dragged into the view, we can customize the configuration item, control the instantiation of the view area components properties. Clicking the Save button will invoke the `onSave` callback to output the configuration of all the components in the viewport as strings, passing that string to the `GaeaPreview` component (installed via `npm i gaea-preview --save`), which will render the runtime page.

# Usage

## Installation

All components can be written on their own, we also provide a set of basic components of the adaptation editor called `gaea-web-components`:

```bash
npm i gaea-editor gaea-web-components --save
```

## A simple example

Write a custom component `custom-component.tsx`.

```typescript
import * as React from 'react'
export default class CustomComponent extends React.Component<any, any>{
    // You need at least two properties in defaultProps to fit into the editor
    static defaultProps = {
        // Edit the name of the menu display
        gaeaName: 'my-textarea', 
        // Ensure that the other components and the overall does not repeat
        // Do not worry, `gaea-web-components` All this field starts with `gaea-`
        gaeaUniqueKey: 'textarea' 
    }

    render() { return <textarea /> }
}
```

Next, display the editor:

```typescript
import * as React from 'react'
import GaeaEditor from 'gaea-editor'
import webBaseComponents from 'gaea-web-components'
import CustomComponent from './custom-component'

// Put the custom components in the array, they will be displayed in the right menu
const customComponentArray: Array<FitGaea.Component> = [CustomComponent]

export default class Home extends React.Component<any, any>{
    render() {
        // Menu components are divided into common and custom, if you like, you can remove the common components
        // However, if there is no gaeaUniqueKey called gaea-layout, or a new outer container is defined by `rootLayoutComponentUniqueKey`, view area rendering will block
        return (
            <div style={{ height: 500 }}>
                <GaeaEditor commonComponents={webBaseComponents} customComponents={customComponentArray} />
            </div>
        )
    }
}
```

## External configuration

If you do not want to put the configuration on defaultProps, or need to migrate many components, you can [achieve through external configuration.](<docs/custom-options.md>)

## Configure rules

In addition to the necessary `gaeaName` and `gaeaUniqueKey`, you can set the [gaeaEdit](<docs/gaea-edit.md>) custom edit settings, set the [gaeaEvent](<docs/gaea-event.md>) custom component event settings.

# Deploy

```bash
npm i gaea-preview --save
```

Pass the string passed by the editor `onSave` callback to the `value` attribute of `gaea-preview`.

Do not forget to give all the components of the editor to `gaea-preview`.

```typescript
import * as React from 'react'
import GaeaPreview from 'gaea-preview'
import webBaseComponents from 'gaea-web-components'
import CustomComponent from './custom-component'

// From the gaea-editor onSave callback
const saveInfo = `{...}`

export default class Production extends React.Component <any, any> {
    render() {
        return (
            <GaeaPreview commonComponents={[Text]} value={saveInfo}/>
        )
    }
}
```

# Development

If you want to extend the plug-in, look at the [developer documentation](<docs/develop.md>)