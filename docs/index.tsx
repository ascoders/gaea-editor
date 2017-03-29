import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { GaeaEditor } from '../gaea-editor'

ReactDOM.render((
    <div style={{ width: '100vw', height: '100vh' }}>
        <GaeaEditor />
    </div>
), document.getElementById('react-dom'))