# GaeaEditor

A scalable web page editor, written by typescript, using symbol and proxy, support modern browsers, not support ie11.

- **Adaptation**: Support all react components. Add a few lines of configuration, you can let your components in the edit menu display, and can be dragged into the view area, and edit its properties.
- **Scalable**: Support plug-ins to expand the editor for any function. Plug-ins can be inserted into any part of the editor, plug-ins can also provide slots for other plug-ins, plug-ins can create and share data flow editor, call the editor arbitrary function.

# Quick start

```bash
npm i gaea-editor --save
```

You can start it quickly:

```typescript
import Editor from "gaea-editor"

// ...
render() {
    return <Editor />
}
// ...
```

# Options

You can add custom components, custom plugins, save callback, and read saved progress.

| Props | Type | Description |
| -------- | -------- | -------- |
| onSave | `(info?: string) => void` | When you click the Save button, feed back to you to save the information |
| value | `string` | Editor initial value, you can pass the value of the onSave callback and resume the draft |
| componentClasses | `Array<React.ComponentClass<IGaeaProps>>` | React classes. Any react component is supported, but you need some configuration information to tell the editor how to edit it. TODO |
| plugins | `IPlugin[]` | Advanced usage for custom editor functionality. TODO |

# Run locally

Will automatically open the default browser.

```bash
yarn
npm start
```

# Other

- [gaea-app](https://github.com/ascoders/gaea-app): Render application with routes. The value of the gaea-editor `onSave` callback is required.
