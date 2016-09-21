import * as React from 'react'
import {observer} from 'mobx-react'
import Gaea from '../index'
import webBaseComponents from '../../gaea-web-components/index'

@observer
export default class Demo extends React.Component <any, any> {
    static title = 'Web 编辑器'
    static description = ``

    render() {
        return (
            <div style={{border: '1px solid #eee'}}>
                <Gaea baseComponents={webBaseComponents}/>
            </div>
        )
    }
}
                