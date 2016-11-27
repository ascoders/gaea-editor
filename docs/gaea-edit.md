# Custom Edit properties

You need to understand that the properties of the editor control component depend on the higher-order components, which is why the components should be as stateless as possible.

Attribute editing has two main points:

1. Controls the value of a props property.
2. Controls the value of multiple attributes, provided by an aggregate editor.

## General Editor

You can use text, number, switch, select these general editor to edit any props attribute.

To ensure real-time updates during editing, **assign initial values to the fields controlled by each editor**.

- `field` Indicates which props field the editor controls, Can be nested fields, such as `style.backgroundColor`.
- `label` Label is the auxiliary text.
- `editor` is the type of editor, different editors may need to expand some additional fields.

### Text editor

If the props is a string, you can use it.

```typescript
const defaultProps = {
    gaeaName = 'customName'
    gaeaUniqueKey = 'customKey'
    gaeaEdit = [{
        field: 'text', // edit props.text
        label: 'your custom description',
        editor: 'text' // edit type
    }]
}
```

### Number editor

The numeric type field can be used with it.

The number type editor extends the more precise control of the `number` field.

```typescript
gaeaEdit = [
    // ...,
    {
        field: 'style.opacity',
        label: 'opacity',
        editor: 'number',
        number: {
            units: [{
                key: '',
                value: '%'
            }],
            currentUnit: '',
            max: 100,
            min: 0,
            step: 1,
            inputRange: [0, 100],
            outputRange: [0, 1],
            slider: true
        }
    }
]
```

- `utils`: If there are multiple suffix available. The key field if not empty, the output to the component type will automatically become a string, such as key: '%', enter 50, will be transmitted to the component 50%.
- `currentUnit`: The current suffix.
- `max`: The maximum.
- `min`: The minimun.
- `step`: The right-hand side increases the step size of the decrease button every click.
- `inputRange, outputRange`: For example, the input 50, will output 0.5.
- `slider`: Whether to use scroll bar coarse grain control.

### Switch editor

Boolean type props You can use the switch editor.

```typescript
gaeaEdit = [
    // ...,
    {
        field: 'checked',
        label: 'is selected',
        editor: 'switch'
    }
]
```

### Select editor

Enumerated type field applies.

The Select type editor extends the more precise control of the `selector` field.

```typescript
gaeaEdit = [
    // ...,
    {
        field: 'enum.field',
        label: 'demo',
        editor: 'select',
        selector: [{
            key: '1',
            value: 'Price reduction'
        }, {
            key: '2',
            value: 'Selling'
        }]
    }
]
```

`key` is the actual value assigned, `value` is the value shown.

> Not finished, you can [customize your own generic plug-in editor](<extend-edit.md>).

## Aggregate Editor

Aggregation editor usually completed very specific editing scenes, such as the div element of the margin, the border style, and so on.

For example, the flex layout editor called `layout`:

```typescript
gaeaEdit = [
    // ...,
    {
        field: null,
        editor: 'layout'
    }
]
```

Because highly targeted, for display, flex, justify-content and other fields, so the `field` needs to be set to null, and does not require the `label` field.

The currently supported aggregate editors are (Almost always set the style):

- background
- border
- font
- instance
- layout
- marginPadding
- overflow
- position
- widthHeight

> Not finished, you can [customize your own Aggregation plug-in editor](<extend-edit.md>).