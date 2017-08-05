# custom component config

Your can add custom component to draggable menu like this:

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

You can customize the editor controls by increase the `gaeaEditor` field in `props`:

```typescript
class Props {
  public gaeaSetting = {
    key: "my-select-component",
    name: "my-select-component",
    editors: [
      "normal",
      {
        label: "boxEditor",
        type: "box-editor"
      },
      "basic",
      {
        field: "defaultValue",
        label: "defaultValue",
        type: "string"
      },
      {
        field: "options",
        label: "options",
        type: "array",
        editors: [{
          field: "value",
          type: "string",
          label: "value"
        }, {
          field: "name",
          type: "string",
          label: "optionName"
        }]
      }
    ],
    events: [{
      name: "onChange",
      field: "onChange",
      data: [{
        name: "newValue"
      }]
    }]
  }
}

class MyInput extends React.Component {
    // `gaeaEditor` read editor controls option in defaultProps.gaeaSetting field
    static defaultProps = new Props()

    render() {
        return <input />
    }
}
```

### Parameter interpretation

#### key

Unique key for all components, The built-in component starts with `gaea-`, like `gaea-text`.

> eg: input text my-custom-text

#### name

Displays the name of the drag and drop list.

> eg: input text

#### editors: Array

Tell the editor what properties can be edited. Value types are divided into `string` and `object`.

##### editor - string

The title of the editing area, usually used for grouping.

> eg: some string

##### editor - object

Tell the editor how a field should be edited.

| property | type | description |
|----|----|----|
| field | string | The name of the field affected by the editor, eg: `text` will effect `props.text`, support `style.background` |
| label | string | Form label |
| type | string | What type of editor is used? BuiltIn enum: `string` `number` `boolean` `color` `array` `object` `box-editor`. You can [add edit types by expanding plug-ins](custom-plugin.md) |
| editors | array | When the type is `array` or `object`, describe how each item in the interior is edited, and the type is the same as editor. |

Array example:

```javascript
{
  field: "options",
  label: "some label",
  type: "array",
  editors: [{
    field: "value",
    type: "string",
    label: "some label"
  }, {
    field: "name",
    type: "string",
    label: "some label"
  }]
}

// -->

props.options = [{
  value: '',
  name: ''
}]
```

```javascript
{
  field: "options",
  label: "some label",
  type: "array",
  editors: "number"
}

// -->

props.options = [1, 2, 3]
```

Object example:

```javascript
{
  field: "options",
  label: "some label",
  type: "object",
  editors: [{
    field: "name",
    type: "string",
    label: "some label"
  }, {
    field: "age",
    type: "number",
    label: "some label"
  }]
}

// -->

props.options = {
  name: 'name',
  age: 18
}
```

#### events: Array

Component response event.

| property | type | description |
|----|----|----|
| name | string | Form label |
| field | string | Callback name, eg: `onClick`, the `onClick` event will be trigger when the component fires `onClick`  |
| data | array | The value provided by this event. The first value of the array corresponds to the first parameter of the callback function. |

