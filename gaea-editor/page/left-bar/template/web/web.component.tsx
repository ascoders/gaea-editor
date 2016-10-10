import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as typings from './web.type'
import {observer, inject} from 'mobx-react'

import DragList from '../../../../utils/drag-list'

const TWO_COLUMN = `N4IgdghgtgpiBcJAkcodCUQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYArAE4AHMIAMANmniFolgCYMITt178BASTAAzDglA4AThxwBnSyHsDqAGzjxgAX0yNmBCTkVLSI/qxuENQcpAIgviA4ENaGALK4gWSUNHTh7Fw8fIIiEjLyyprCKiI6kdGxAMIAFoRuACaO8ADaDEyseoWGJVJyiipqGgDMOnkDBsViI+Xj6iyiIAC6CWwt7Z2gswXzQotlY6qr016Jtg5OLu6eoKYeAB4A4rYA7nTC8X59TLBHJhPosOoxOIJJIpQTpfBELIhXJguZFE6lUbKC4abQJQ76dHDM7YiZrJw2Oz7ZyuDxOF4wD7fX7/XoBRHA0JsiJRSGsmFpDIc7JcgmDBaY5Y4rTxbzeIA=`

const THREE_COLUMN = `N4IgdghgtgpiBcJCQcodCUQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYArAE4AHMIAM4hQGZZolpIwhO3XvwEBJMADMOCUDgBOHHAGcLIOwOoAbOPGABfTI2YEScipaRD9WVwhqDlIBEB8QHAgrAwBZXACySho6MPYuHj5BEQkZeQUANgAmYXLpEW0IqJiAYQALQlcAEwd4AG0GJlZdAoNiqTlFZTUNcu1c4f0isXGyqfUWcTnBvL1CoWXSydV12RAAXXi2dq6e0Hn8xf2SiaVjmcdrW1unF3dHE3cAA8AOI2ADudGEcV8gwyQWyoW2jWisXiiWSgjS+CImWCOW2Cz2Y0Or2mmmhA2YOxGS2eqzeGw+Nnsjmcbg8oABMBB4MhFLCcKyIUp4UiKIp6NS6Rx8OF912owOLzWGi08XlNKeKyOZNOngSzO+bL++q5PI4EMQUPVsJlQvxVORMQlSSl2MC9sRVMJirpOvWaq8XiAA===
`

const FOUR_COLUMN = `N4IgdghgtgpiBcJDbaodCUQBoRQgBwKpgCWAjgK4wDSMAngiAOYQwQC0AxgPZQ4dgxgAXFgEYALAHYArAE4AHMIAM4xeOktpGEJ269+AgJJgAZhwSgcAJw44AzmZA2B1ADZx4wAL6ZGzAiXJUtIg+rM4Q1BykAiBeIDgQFnoAsrh+ZJQ0dCHsXDx8giISMvIKAGwATMKlasKaYRFRAMIAFoTOACZ28ADaDEys2nl6hVJyKio1CprZg7oFYqMlyko1td79OTr5QgvF4ysi5dMbs9sje0oTIgDMIAC6sWytHV2gM7lzO0VjlweK9pZrK8HE5XPYjK4AB4AcSsAHc6LVYiE0gFMsENvVItFYvFEoIUvgiOlAlkTh8zrsfstVOoYutmJshvNvksrsJau44lZbPZHC43KAITAYfDEfS+r5iWigpLQuFsRK8clUtKMrL3lthlS2QcNMjyVqWYt9rThEcuYDeVz+WCucLRRwEYgkQyIKj1WTGViokqEiqif5PRjGadtazTWp9W6mZ9ztT2bdLTzgbbBSAHbCneKDVKg6SQ/KGjjMMqCar8+i5bHKRHfrT9R4PEA`

const LEFT_IMAGE_RIGHT_TEXT = `N4IgdghgtgpiBcJBnuoP7VDPyodW0QBoRQgA4CqYAlgI4CuMA0jAJ4IgDmEMEAtAMYD2UBPMDDAAXDgEYALAHYArAE4AHOIAM0gEwBmaZImScIXv0HCRASTAAzHglAEATjwIBnWyGcj6AGzjxgAX1xWdhIKajpGRGDOLwh6HkoREECQAgh7UwBZQlCqWgYmaO4+ASFRPTklVQA2dXFq+QkDWPjEgGEAC1IvABNXeABtFjZOI1LTCoVlNS0dCVkDIrGTcqlK6Y1tXXFpEABdFK4u3v7QJZKVsTWp1U258QW/VMcXNw9vX1AIL1JmMDMRDAoP1DKYYPZkkERrlwgUoiMOC0EkkUmkMqJssQyHkIoUEcsylcZDcZls9M04sjOt0+gghudjITJlVSfdqvsUgzxqtiSy7tt2U8HE5Tu5PD5bJzodjYZFhuwOICAB4o3BorI5GX5OVcy7MjazbYLKUKgkTa58w0SXZCl6i94Sp6WHxKgDijgA7kxxAYAFaUDykSz0NqCQGiJjONJcGAcABGMBEHpgwgM31+/0BwKYMdE4Mh8ogMO1eIVSMSBfVGM1YRL8NNFyZFoNZKkFNaImpJzpheKjPNvJb90Ui3xjYH61uVvE8g5UIb/Z5k9Z2xHtpFb3FnxNRa1uPrnGVqtS6Q1WNr+97ZqXJP51oLuqbg6nrdn69eTwd2/nu4vcN75bHlWIiYsWl6PhOt7TrsuCAV2tKDFe443paZLqCoc5IYuRLLne6FuMKH6gF+bg9KQUYtEwzowEqaY/H8AJAiCuaAhCKRHkwSpKgAdFxvG0T+YH/kUHGoqe1bnjiwljth+ovvcs7+EpQA===`

@inject('setting', 'viewport', 'application') @observer
export default class Web extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    componentDidMount() {
        new DragList(ReactDOM.findDOMNode(this.refs['dragContainer1']), this.props.viewport)
        new DragList(ReactDOM.findDOMNode(this.refs['dragContainer2']), this.props.viewport)
    }

    render() {
        return (
            <div>
                <div className="drag-container"
                     ref="dragContainer1">
                    <div className="template-item"
                         data-source={TWO_COLUMN}>两列
                    </div>
                    <div className="template-item"
                         data-source={THREE_COLUMN}>三列
                    </div>
                    <div className="template-item"
                         data-source={FOUR_COLUMN}>四列
                    </div>
                </div>

                <div className="title">卡片</div>
                <div className="drag-container"
                     ref="dragContainer2">
                    <div className="template-item"
                         data-source={LEFT_IMAGE_RIGHT_TEXT}>左图右字
                    </div>
                </div>
            </div>
        )
    }
}