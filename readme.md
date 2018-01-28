# Gaea Editor &middot; [![CircleCI Status](https://img.shields.io/travis/ascoders/gaea-editor/master.svg?style=flat)](https://travis-ci.org/dobjs/dob) [![npm version](https://img.shields.io/npm/v/gaea-editor.svg?style=flat)](https://www.npmjs.com/package/dob) [![code coverage](https://img.shields.io/codecov/c/github/ascoders/gaea-editor/master.svg)](https://codecov.io/github/dobjs/dob)

<p align="center">
    <img src="./docs/images/home-snapshot.png" height=300/>
    <h3 align="center">gaea-editor</h3>
    <p align="center">
        <i>
            Help develops build a scalable website visualization builder.
        </i>
    <p>
    <p align="center">
        <i>
            <a target="_blank" href="https://jsfiddle.net/gjLqweam/6/">Try it online.</a>.
        </i>
    </p>
</p>

## Quick start

```bash
npm i gaea-editor --save
```

And then, it's easy to use:

```typescript
import Editor from "gaea-editor"

ReactDOM.render(
    <div style={{width: '100vw', height: '100vh'}}>
        <Editor />
    </div>,
    document.getElementById("react-root")
)
```

## Add custom component to the drag menu

You can add any react components to the drag menu, through the following line of code:

```typescript
<Editor componentClasses={[CustomComponent1, CustomComponent2]} />
```

Add `editSetting` to each component props, to let the editor know how to edit it visualizations:

```typescript
defaultProps = {
    editSetting: {
        key: 'my-custom-key', // Unique key.
        name: 'Custom one', // The name shown in drag menu.
        editors: [{
            field: "title",
            text: "Text",
            type: "string"
        }] // Tell gaea-editor, which props can be edited and how to edit it.
    }
}
```

## More about `editors`

gaea-editor provides several built-in type editing props. If you need to expand it, you can refer to [custom plugin](./docs/custom-plugin.md).

common field:

- `field`: which props to edit. EX: `value` `visible` `style.backgroundColor`.
- `text`: If exist, will appear in the form label to prompt the user.

The following are the built-in types:

### string

![](./docs/images/string.png)

Suitable for any string editing.

```typescript
{
    type: 'string',
    text: 'Text',
    field: 'value'
}
```

## Options

You can add custom components, custom plugins, save callback, and read saved data.

| Props | Type | Description |
| -------- | -------- | -------- |
| onSave | `(info?: string) => void` | When you click the Save button, feed back to you to save the information |
| value | `string` | Editor initial value, you can pass the value of the onSave callback and resume the draft |
| componentClasses | `Array<React.ComponentClass<IGaeaProps>>` | React classes. Any react component is supported, but you need some configuration information to tell the editor how to edit it. see [custom-component-config](docs/custom-component-config.md) |
| plugins | `IPlugin[]` | Advanced usage for custom editor functionality. TODO |

## Parameter: `onSave`

```typescript
export function renderGaeaEditor() {
    return (
        <Editor onSave={ value => {
            // send the value data to your server.
        } }/>
    )
}
```

## Parameter: `value`

The `value` came from `onSave`.

```typescript
export function renderGaeaEditor() {
    return (
        <Editor value={value} />
    )
}
```

## Parameter: `componentClasses`

```typescript
class MyInput extends React.Component {
    render() {
        return <input />
    }
}

export function renderGaeaEditor() {
    return (
        <Editor componentClasses={[ MyInput ]}/>
    )
}
```

> [LiveDemo](https://jsfiddle.net/47rpn9ud/2/)

Read more in [custom-component-config](docs/custom-component-config.md).

## Parameter: `plugins`

First you should install `dob-react`.

```bash
npm i dob-react
```

```typescript
import { Connect } from 'dob-react'

@Connect
class Plugin extends React.Component {
  render() {	
  	return 'plugin'
  }
}

const plugin {
  position: "mainToolEditorTypeShow",
  class: ShowEditor
}

export function renderGaeaEditor() {
    return (
        <Editor plugins={[ Plugin ]}/>
    )
}
```

> [CustomEditTypeLiveDemo](https://jsfiddle.net/kq935dbq/3/)

What is `position`? What can i do with plugin? See more in [custom-plugin](docs/custom-plugin.md)

# Local development run

```bash
git clone https://github.com/ascoders/gaea-editor.git
cd gaea-editor
yarn
npm start
```

Will automatically open the default browser.

# Deploy

The page configured with the editor cannot be used as a production environment, and we provide [gaea-app](https://github.com/ascoders/gaea-app) to deploy it:

Render application with routes, the value of the gaea-editor `onSave` callback is required.
