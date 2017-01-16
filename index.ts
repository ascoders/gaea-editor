import 'gaea-model'
import * as LZString from 'lz-string'

import GaeaEditor from './gaea-editor/gaea-editor.component'
import {PropsDefine as GaeaEditorPropsDefine} from './gaea-editor/gaea-editor.type'

export {GaeaEditor, GaeaEditorPropsDefine}
export default GaeaEditor

const LZDecode = LZString.decompressFromBase64
const LZEncode = LZString.compressToBase64
export {LZDecode as decode}
export {LZEncode as encode}