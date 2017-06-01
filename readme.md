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
    return <Editor/>
}
// ...
```

# Options

TODO

You can add custom components, custom plugins, save callback, and read saved progress.

# Other

- [https://github.com/ascoders/gaea-app](https://github.com/ascoders/gaea-app): Render application with routes. The value of the gaea-editor `onSave` callback is required.
