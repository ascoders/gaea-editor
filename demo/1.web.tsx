import * as React from 'react'
import {observer} from 'mobx-react'
import Gaea from '../index'
import webBaseComponents from '../../gaea-web-components/index'
import Message from '../../../web-common/message/index'

@observer
export default class Demo extends React.Component <any, any> {
    static title = 'Web 编辑器'
    static description = ``

    handleSave(obj: any) {
        Message.info(JSON.stringify(obj))
        console.log(JSON.stringify(obj))
    }

    render() {
        return (
            <div style={{border: '1px solid #eee'}}>
                <Gaea baseComponents={webBaseComponents}
                      onSave={this.handleSave.bind(this)}/>
            </div>
        )
    }
}
                