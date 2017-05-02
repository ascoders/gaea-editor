import * as React from "react"
import * as ReactDOM from "react-dom"
import { GaeaEditor } from "../src"

import Container from "./components/container/container.component"
import Text from "./components/text/text.component"

ReactDOM.render((
    <div style={{ width: "100vw", height: "100vh" }}>
        <GaeaEditor componentClasses={[Container, Text]} />
    </div>
), document.getElementById("react-dom"))
