# GaeaEditor

A cross three end online application editor.

# Developer - Create your own plugin

Import `EditorManager` first.

```typescript
import {EditorManager} from 'gaea-editor'
```

### Render to editor

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

[image]

### Inject data stream

```typescript
@EditorManager.observer(['application', 'applicationAction'])
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    render () {
        const {application} = this.props
        return (
            <div>viewport backgroundColor : {application.viewportStyle.backgroundColor}</div>
        )
    }
}
```

Now change the background color:

```typescript
@EditorManager.observer(['application', 'applicationAction'])
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    handleClick () {
        const {applicationAction} = this.props
        applicationAction.viewportStyleSet({
            backgroundColor: '#f5f5f5'
        })
    }
    
    render () {
        const {application} = this.props
        return (
            <div onClick={this.handleClick.bind(this)}>viewport backgroundColor : {application.viewportStyle.backgroundColor}</div>
        )
    }
}
```

[image]

### With type helper

```typescript
interface Props {
    application: EditorManager.ApplicationStore
    applicationAction: EditorManager.ApplicationAction
}

@EditorManager.observer(['application', 'applicationAction'])
class MyFirstPlugin extends React.Component <any, any> {
    // ...
}
```

### Create plugin store

Create `store.ts`:

```typescript
// can inject into action
@EditorManager.injectable()
export default class MyFirstPluginStore {
    // will auto render component when updated
    @EditorManager.observable variable = 'apple'
}
```

Define attribute `Store` in class, and inject it:

```typescript
// inject MyFirstPluginStore
@EditorManager.observer(['myFirstPluginStore'])
class MyFirstPlugin extends React.Component <any, any> {
    static position = 'navbarLeft'
    // Can automatically injected into the editor and referenced by lower case first letter.
    static Store = MyFirstPluginStore
    
    render () {
        const {myFirstPluginStore} = this.props
        return (
            <div>{myFirstPluginStore.variable}</div>
        )
    }
}
```

### Create plugin action

Similar to create store, can inject any store:

```typescript
@EditorManager.injectable()
export default class MyFirstPluginAction {
    @EditorManager.lazyInject(myFirstPluginStore) private myFirstPluginStore: myFirstPluginStore

    @EditorManager.action('set variable') setVariable(variable: string) {
        this.myFirstPluginStore.variable = variable
    }
}
```

Inject and use it:

```typescript
@EditorManager.observer(['myFirstPluginAction', 'myFirstPluginStore'])
class MyFirstPlugin extends React.Component <any, any> {
    static position = 'navbarLeft'
    static Store = MyFirstPluginStore
    static Action = MyFirstPluginAction
    
    componentWillMount () {
         const {myFirstPluginAction} = this.props
         myFirstPluginAction.setVariable('two')
    }
    
    render () {
        const {myFirstPluginStore} = this.props
        return (
            <div>{myFirstPluginStore.variable}</div>
        )
    }
}
```

### Create Plugin render position

In addition to rendering in the editor to provide location such as the navigation bar, the plug-in can also set aside their own location for other plug-ins to expand.

```typescript
@EditorManager.observer(['applicationAction'])
class MyFirstPlugin extends React.Component <any, any> {
    // Render to the left navbar
    static position = 'navbarLeft'
    
    render () {
        const {applicationAction} = this.props
        return (
            <div>
                <div className="left-hook">
                    // other plugin can set to this position:
                    // static position = 'myPluginLeftHook'
                    applicationAction.loadingPluginByPosition('myPluginLeftHook')
                </div>
                <div className="right-hook">
                    applicationAction.loadingPluginByPosition('myPluginRightHook')
                </div>
            </div>
        )
    }
}
```

### Deploy plugin

Gaia editor included the following plug-ins to ensure that the core function of stability: 

- gaea-plugin-global-setting
- gaea-plugin-tab-tools
- gaea-plugin-tab-tools-components
- gaea-plugin-tab-tools-components-common

You can also manually add your own plug-ins by the following way, if you want to be built in the project, you can send me an e-mail.

```typescript
<GaeaEditor plugins={[MyFirstPlugin]}/>
```