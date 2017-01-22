# Achieve through external configuration

The configuration is an object, and the key must be exactly the same as the class name of the component.

The configuration is passed to the attribute `customOptions`:

```typescript
import * as React from 'react'
import GaeaEditor from 'gaea-editor'
import webBaseComponents from 'gaea-web-components'
import {Input} from 'ant-design'

const antdOptions = {
    // Corresponding to this component `class Input ...`
    Input: {
        // The following configuration is exactly the same as in defaultProps
        gaeaName: 'antInput',
        gaeaUniqueKey: 'ant-input'
    }
}

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <GaeaEditor commonComponents={webBaseComponents} 
                        customComponents={[Input]} 
                        customOptions={antdOptions}/>
        )
    }
}
```