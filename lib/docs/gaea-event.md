# Custom events

Event is divided into the timing and effect.

## Trigger timing

Use `triggers` attribute.

- `name`: Prompt text.
- `type`: Event Trigger Type.
- `selfCallback`: If set to true, that call their own callback function, the function name is type `field`.

The `type` are divided into the following fixed timings:

- `init`: When the component is instantiated.
- `listen`: Monitoring events, specific monitoring what will be asked when editing.
- `[self callback]`: `selfCallback` set to true, when the trigger when their callback, as the trigger time.

## Effect

Use `effects` attribute.

- `name`: Prompt text.
- `type`: The type of the trigger event.
- `call`: If the `type` is `call`, will trigger a callback `onCall`, parameters were `functionName` and `params`.

The `type` are divided into the following fixed timings:

- `emit`: Trigger event.
- `updateProps`: Any modification of their properties, the user in the editor to configure their own modified value, similar to the flash key effect.
- `call`: Trigger callback, the deployment side can be done according to Oncall callback corresponding operation, such as transfer from the sharing.

## Example

```typescript
gaeaEvent = {
    triggers: [{
        name: 'click',
        type: 'onClick',
        selfCallback: true
    }],
    effects: [{
        name: 'jump to url',
        type: 'jumpUrl'
    }, {
        name: 'popScene',
        type: 'call',
        call: {
            functionName: 'back'
        }
    }]
}
```