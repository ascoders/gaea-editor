import * as React from "react"
import * as ReactDOM from "react-dom"
import { GaeaEditor } from "../src"

import Container from "./components/container/container.component"

ReactDOM.render((
    <div style={{ width: "100vw", height: "100vh" }}>
        <GaeaEditor componentClasses={[Container]} />
    </div>
), document.getElementById("react-dom"))
