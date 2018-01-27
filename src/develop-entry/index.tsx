import * as React from "react"
import * as ReactDOM from "react-dom"
import GaeaEditor from "../index"

import GaeaComponents from "../gaea-components"

ReactDOM.render((
    <div style={{ width: "100vw", height: "100vh" }}>
        <GaeaEditor componentClasses={GaeaComponents} />
    </div>
), document.getElementById("react-dom"))
