// tslint:disable-next-line:no-reference
/// <reference path="./define.d.ts"/>
// tslint:disable-next-line:no-reference
/// <reference path="./defines/application.d.ts"/>
// tslint:disable-next-line:no-reference
/// <reference path="./defines/viewport.d.ts"/>

import GaeaEditor from "./gaea-editor.component"

import "dob-react-devtools"

import { startDebug } from "dob-react"
startDebug()

export default GaeaEditor

export { StoreProps } from "./stores/index"
export { GaeaEditor }
