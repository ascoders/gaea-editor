# 1 GaeaEditor

A cross three end online application editor.

![](assets/screenshot.jpg)

# 2 Usage

## 2.1 Installation

```bash
npm i gaea-editor --save
```

## 2.2 Basic Usage

Install the basic components of the author, or write your own basic components.

```bash
npm i gaea-web-components
```

```typescript
import {GaeaEditor} from 'gaea-editor'
import webBaseComponents from 'gaea-web-components' // or yours

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <div style={{width:500, height:400}}>
                <GaeaEditor commonComponents={webBaseComponents}
                            defaultValue=""
                            onSave={(saveInfo: string)=>{})}/>
            </div>
        )
    }
}
```

## 2.2 Component access platform

Any react component can access.

### 2.2.1 Define editing effect by props

`defaultProps`:

```typescript
const defaultProps = {
    gaeaName = 'textName' // Component name for the editor shown
    gaeaUniqueKey = 'gaea-text' // Any string that does not repeat
    gaeaEdit = [{
        field: 'text', // edit props.text
        label: 'your custom description',
        editor: 'text' // edit type
    }]
}
```

Or use higher order components:

```typescript
import {Input} from 'ant-design'

class MyInput extends React.Component <any, any> {
    defaultProps = defaultProps

    render() {
        return (
            <Input value={this.props.value}/>
        )
    }
}

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <GaeaEditor commonComponents={[MyInput]}/>
        )
    }
}
```

### 2.2.2 Define editing effect by json

```typescript
import {Input} from 'ant-design'

const antdOptions = {
    Input: { // key 'Input' is same with Input's className
        gaeaName = 'antInput'
        gaeaUniqueKey = 'ant-input'
        gaeaEdit = [{
            field: 'value', 
            label: 'antd input value',
            editor: 'text'
       }]
    }
}

export default class Demo extends React.Component <any, any> {
    render() {
        return (
            <GaeaEditor commonComponents={[Text]} customOptions={antdOptions}/>
        )
    }
}
```

### 2.3 Deploy

```bash
npm i gaea-preview --save
```

Remember this function in `GaeaEditor` -- `onSave={(saveInfo: string)=>{})}` ? Just pass `GaeaPreview` this value `saveInfo`:

```typescript
import GaeaPreview from 'gaea-preview'

export default class Production extends React.Component <any, any> {
    render() {
        return (
            <GaeaPreview commonComponents={[Text]} value={saveInfo}/>
        )
    }
}
```

The page appears.

# 3 Developer - Create your own plugin

Import `EditorManager` first.

```typescript
import {EditorManager} from 'gaea-editor'
```

The following is a complete screenshot, so you understand the principles of plugin work:

`tree.component.tsx`:

![](assets/plugin-component.jpg)

`tree.action.ts`:

![](assets/plugin-action.jpg)

`tree.store.ts`:

![](assets/plugin-store.jpg)

## 3.1 Render to editor

Then create `my-first-plugin.tsx`, and render it in the navigation bar:

```typescript
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    render () {
        return (
            <div>Hello world</div>
        )
    }
}
```

```typescript
<GaeaEditor plugins={[MyFirstPlugin]}/>
```

## 3.2 Inject data stream

```typescript
@EditorManager.observer(['ApplicationStore'])
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    render () {
        return (
            <div>viewport backgroundColor : {this.props.ApplicationStore.viewportStyle.backgroundColor}</div>
        )
    }
}
```

Now change the background color:

```typescript
@EditorManager.observer(['ApplicationStore', 'ApplicationAction'])
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    handleClick () {
        this.props.ApplicationAction.viewportStyleSet({
            backgroundColor: '#f5f5f5'
        })
    }
    
    render () {
        return (
            <div onClick={this.handleClick.bind(this)}>viewport backgroundColor : {this.props.ApplicationStore.viewportStyle.backgroundColor}</div>
        )
    }
}
```

## 3.3 With type helper

```typescript
interface Props {
    ApplicationStore: EditorManager.ApplicationStore
    ApplicationAction: EditorManager.ApplicationAction
}

@EditorManager.observer(['ApplicationStore', 'ApplicationAction'])
class MyFirstPlugin extends React.Component <Props, {}}> {
    // ...
}
```

## 3.4 Create plugin store

Create `store.ts`:

```typescript
export default class MyFirstPluginStore {
    // will auto render component when updated
    @EditorManager.observable variable = 'apple'
}
```

Define attribute `Store` in class, and inject it:

```typescript
// inject MyFirstPluginStore
@EditorManager.observer(['MyFirstPluginStore'])
class MyFirstPlugin extends React.Component <any, any> {
    static position = 'navbarLeft'
    // Can automatically injected into the editor and referenced by lower case first letter.
    static Store = MyFirstPluginStore
    
    render () {
        return (
            <div>{this.props.MyFirstPluginStore.variable}</div>
        )
    }
}
```

Or inject core store to your store:

```typescript
export default class MyFirstPluginStore {
    @EditorManager.inject('ViewportStore') private viewport: ViewportStore

    // log current hover mapUniquekey
    @EditorManager.computed get currentHoverTreeDom() {
        return 'current hover mapUniqueKey: ' + this.viewport.currentHoverComponentMapUniqueKey
    }
}
```

## 3.5 Create plugin action

Similar to create store, can inject any store:

```typescript
export default class MyFirstPluginAction {
    @EditorManager.inject('MyFirstPluginStore') private myFirstPluginStore: myFirstPluginStore

    @EditorManager.action('set variable') setVariable(variable: string) {
        this.myFirstPluginStore.variable = variable
    }
}
```

Inject and use it:

```typescript
@EditorManager.observer(['MyFirstPluginStore', 'MyFirstPluginAction'])
class MyFirstPlugin extends React.Component <any, any> {
    static position = 'navbarLeft'
    static Store = MyFirstPluginStore
    static Action = MyFirstPluginAction
    
    componentWillMount () {
         this.props.MyFirstPluginAction.setVariable('two')
    }
    
    render () {
        return (
            <div>{this.props.MyFirstPluginStore.variable}</div>
        )
    }
}
```

## 3.6 Create Plugin render position

In addition to rendering in the editor to provide location such as the navigation bar, the plug-in can also set aside their own location for other plug-ins to expand.

```typescript
@EditorManager.observer(['ApplicationAction'])
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    render () {
        return (
            <div>
                <div className="left-hook">
                    // other plugin can set to this position:
                    // static position = 'myPluginLeftHook'
                    this.props.ApplicationAction.loadingPluginByPosition('myPluginLeftHook')
                </div>
                <div className="right-hook">
                    this.props.ApplicationAction.loadingPluginByPosition('myPluginRightHook')
                </div>
            </div>
        )
    }
}
```

## 3.7 Extend Edit Type

You can named `static position='editorAttributeCustomName'` to handle `editor='customName'`.

## 3.8 Deploy plugin

Gaia editor included the following plug-ins to ensure that the core function of stability: 

- tab-tools
- tab-tools-components
- tab-tools-components-common
- tab-tools-components-custom
- tab-tools-components-combo
- tab-tools-version
- editor-tabs
- editor-tabs-attribute
- editor-tabs-attribute-text
- editor-tabs-attribute-number
- editor-tabs-attribute-background
- editor-tabs-attribute-border
- editor-tabs-attribute-font
- editor-tabs-attribute-instance
- editor-tabs-attribute-layout
- editor-tabs-attribute-margin-padding
- editor-tabs-attribute-overflow
- editor-tabs-attribute-position
- editor-tabs-attribute-select
- editor-tabs-attribute-switch
- editor-tabs-attribute-width-height
- editor-tabs-event
- preview
- publish
- save
- copy-paste
- crumbs
- delete
- viewport-size
- viewport-guideline
- show-layout-button
- tree
- global-setting
- external-variable-button
- external-variable

You can also manually add your own plug-ins by the following way, if you want to be built in the project, you can send me an e-mail.

```typescript
<GaeaEditor plugins={[MyFirstPlugin]}/>
```

## 3.9 core data stream

### 3.9.1 Actions

**`ApplicationAction`** **`ViewportAction`** **`EventAction`**

#### 3.9.1.1 ApplicationAction

| Method        | Params           | Description  |
| :------------- |:-------------| :-----|
| loadingPluginByPosition      | position: string, props: any = {} | load plugins UI who's `static position` equal `position` |
| setViewportStyle | style: React.CSSProperties | |
| setViewportContainerStyle | style: React.CSSProperties | |
| resetViewportStyle | | |
| getComponentClassByGaeaUniqueKey | gaeaUniqueKey: string | get Class by uniqueKey |
| setPreview | inPreview: boolean | set preview statu |
| updatePage | pageValue: string | re render full editor viewport |
| toggleLeftBar | type: string | |


#### 3.9.1.2 ViewportAction

| Method        | Params           | Description  |
| :------------- |:-------------| :-----|
| setRootMapUniqueKey      | string | Initialization of the automatic implementation, it is best not to manually modify |
| setViewportDom | dom: HTMLElement | Initialization of the automatic implementation, it is best not to manually modify |
| setComponent | mapUniqueKey: string, componentInfo: FitGaea.ViewportComponentInfo | set viewport component info |
| addNewComponent | uniqueKey: string, parentMapUniqueKey: string, index: number | |
| moveComponent | sourceMapUniqueKey: string, sourceIndex: number, targetMapUniqueKey: string, targetIndex: number | Cross parent drag |
| horizontalMoveComponent | parentMapUniqueKey: string, beforeIndex: number, afterIndex: number | Rank with the parent |
| addComboComponent | parentMapUniqueKey: string, componentFullInfo: FitGaea.ViewportComponentFullInfo, index: number | Add an element with an existing attribute |
| addComboComponentBySource | parentMapUniqueKey: string, componentFullInfoSource: string, index: number | combo component with compressed source |
| removeComponent | mapUniqueKey: string | If the current component has child elements, it will all be removed |
| setCurrentHoverComponentMapUniqueKey | mapUniqueKey: string | |
| setCurrentEditComponentMapUniqueKey | mapUniqueKey: string | |
| createUniqueKey | | Basic method |
| setDomInstance | mapUniqueKey: string, dom: HTMLElement | |
| removeDomInstance | mapUniqueKey: string | |
| startDrag | dragInfo: FitGaea.CurrentDragComponentInfo | Rarely used |
| endDrag | | Rarely used |
| setDragTargetInfo | mapUniqueKey: string, index: number | Rarely used |
| setLayoutComponentActive | active: boolean | |
| updateCurrentEditComponentProps | field: string, value: any | is used very often |
| updateComponentProps | mapUniqueKey: string, field: string, value: any | change any component's props |
| resetProps | mapUniqueKey: string | |
| clean | | For example, to close the edit state, the equivalent of the user did not do any operations |
| addToParent | mapUniqueKey: string, parentMapUniqueKey: string, index: number | |
| registerInnerDrag | mapUniqueKey: string, dragParentElement: HTMLElement, groupName = 'gaea-can-drag-in', sortableParam: any = {} | set viewport draggable |
| registerOuterDrag | dragParentElement: HTMLElement, groupName = 'gaea-can-drag-in' | set menu draggable |
| getComponentFullInfoByMapUniqueKey | mapUniqueKey: string | |

#### 3.9.1.3 EventAction

| Method        | Params           | Description  |
| :------------- |:-------------| :-----|
| emit      | eventType: EventType, context?: any | dispatch event |
| on | eventType: EventType, callback: Function, context?: any | listener event |
| off | eventType: EventType, callback: Function | Cancel listener event |

### 3.9.2 Stores

**`ApplicationStore`** **`ViewportStore`** **`EventStore`**

#### 3.9.2.1 ApplicationStore

| Data        | Type           | Description  |
| :------------- |:-------------| :-----|
| editorProps | FitGaea.PropsDefine | GaeaEditor's props |
| customComponents      | Array<React.ComponentClass<FitGaea.ComponentProps>> | custom Component Class |
| navbarHeight | number | |
| plugins | Array<FitGaea.Plugin> | core and custom plugins |
| pageValue | string | editor viewport full value |
| viewportStyle | React.CSSProperties | |
| viewportContainerStyle | React.CSSProperties | |
| inPreview | boolean | |
| leftBarType | string | |

#### 3.9.2.2 ViewportStore

| Data        | Type           | Description  |
| :------------- |:-------------| :-----|
| components | map<FitGaea.ViewportComponentInfo> | viewport's all component instance's mapped value |
| componentDomInstances | Map<string,HTMLElement> | viewport's all component instance's dom |
| rootMapUniqueKey | string | root component's mapUniqueKey |
| viewportDom | HTMLElement | viewport container's dom |
| currentHoverComponentMapUniqueKey | string | |
| currentHoverComponentDom | HTMLElement | |
| currentEditComponentMapUniqueKey | string | |
| currentEditComponentInfo | FitGaea.ViewportComponentInfo | |
| currentDragComponentInfo | FitGaea.ViewportComponentInfo | |
| showEditComponents | boolean | show edit box? |
| isLayoutComponentActive | boolean | show empty layout component? |
| currentEditComponentPath | Array<string> | `eg:['self-key', 'parent1-key', 'parent2-key', 'root-key']` |

#### 3.9.2.3 EventStore

| Data        | Type           | Description  |
| :------------- |:-------------| :-----|
| mouseLeaveViewport | string | |
| mouseHoveringComponent | string | |
| viewportUpdated | string | |
| viewportDomUpdate | string | |