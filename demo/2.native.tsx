import * as React from 'react'
import {observer} from 'mobx-react'
import Gaea from '../index'
import nativeBaseComponents from '../../gaea-native-components/index'

@observer
export default class Demo extends React.Component <any, any> {
    static title = 'Native 编辑器'
    static description = ``

    render() {
        return (
            <div style={{border: '1px solid #eee', height:300}}>
                <Gaea isReactNative={true}
                      commonComponents={nativeBaseComponents}/>
            </div>
        )
    }
}
