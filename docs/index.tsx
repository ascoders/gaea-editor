import * as React from "react"
import * as ReactDOM from "react-dom"
import GaeaEditor from "../src"

import RemoteComponent from "./components/remote-component/remote-component.component"

ReactDOM.render((
    <div style={{ width: "100vw", height: "100vh" }}>
        <GaeaEditor componentClasses={[RemoteComponent]} />
    </div>
), document.getElementById("react-dom"))
