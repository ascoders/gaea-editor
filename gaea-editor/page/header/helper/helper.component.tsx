import * as React from 'react'
import * as typings from './helper.type'
import {observer, inject} from 'mobx-react'

import Modal from '../../../../../../web-common/modal/index'
import Button from '../../../../../../web-common/button/index'
import {Tabs, TabPanel} from '../../../../../../web-common/tabs/index'
import {autoBindMethod} from '../../../../../../common/auto-bind/index'

import './helper.scss'

@inject('setting', 'application', 'viewport') @observer
export default class Helper extends React.Component <typings.PropsDefine, typings.StateDefine> {
    static defaultProps: typings.PropsDefine = new typings.Props()
    public state: typings.StateDefine = new typings.State()

    @autoBindMethod handleShowModal() {
        this.setState({
            show: true
        })
    }

    @autoBindMethod handleOk() {
        this.setState({
            show: false
        })
    }

    @autoBindMethod handleCancel() {
        this.setState({
            show: false
        })
    }

    @autoBindMethod renderOperateButton(triggerOk: any, triggerCancel: Function) {
        return (
            <div>
                <Button onClick={triggerOk}>我知道了</Button>
            </div>
        )
    }

    render() {
        return (
            <div className="menu-item"
                 onClick={this.handleShowModal}>
                帮助
                <div className="_namespace">
                    <Modal className="_namespace"
                           title="帮助"
                           size="large"
                           renderOperateButton={this.renderOperateButton}
                           show={this.state.show}
                           onOk={this.handleOk.bind(this)}
                           onCancel={this.handleCancel.bind(this)}>
                        <Tabs defaultActiveKey="1">
                            <TabPanel tab="基本操作"
                                      activeKey="1"
                                      className="container">
                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">拖拽</div>
                                        <div className="helper-description">右侧菜单可拖拽组件到视图中，视图中也可拖拽排序</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/9a504fc2d562853513ca6ecd98ef76c6a7ef6330.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">编辑</div>
                                        <div className="helper-description">点击视图中组件开启编辑菜单，修改菜单中选项组件会实时更新</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/d439b6003af33a872284bff6ce5c10385243b575.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">删除</div>
                                        <div className="helper-description">编辑菜单右上角有删除按钮</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/8c1001e93901213f51f7f7305ce736d12e2e9512.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">修改视图尺寸</div>
                                        <div className="helper-description">菜单可以调节视图宽度</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/6d81800a19d8bc3ea9f3be268a8ba61ea9d34566.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">撤销/重做</div>
                                        <div className="helper-description">菜单可以回撤、重做修改操作</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/f636afc379310a55d6b16618bf4543a983261040.jpg"/>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel tab="快捷键"
                                      activeKey="2"
                                      className="container">
                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">撤销/重做</div>
                                        <div className="helper-description">
                                            <p>撤销：ctrl/cmd + z</p>
                                            <p style={{marginTop:10}}>重做：ctrl/cmd + shift + z</p>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/c8177f3e6709c93d0f810c1a973df8dcd00054ef.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">保存</div>
                                        <div className="helper-description">
                                            <p>ctrl/cmd + s</p>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/e1fe9925bc315c60687c690285b1cb1348547775.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">复制/粘贴</div>
                                        <div className="helper-description">
                                            <p>复制：ctrl/cmd + c</p>
                                            <p style={{marginTop:10}}>粘贴：ctrl/cmd + v</p>
                                            <p style={{marginTop:10}}>注意，复制的是鼠标所在位置的元素，粘贴也会粘贴到鼠标所在位置的元素中</p>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/b3fb43166d224f4ada7971fe01f790529922d17f.jpg"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">删除</div>
                                        <div className="helper-description">
                                            <p>delete/backspace</p>
                                            <p style={{marginTop:10}}>注意，删除的是鼠标所在位置的元素</p>
                                        </div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/63d9f2d3572c11df4168b2ce6b2762d0f603c2a6.jpg"/>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel tab="辅助"
                                      activeKey="3"
                                      className="container">
                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">显示空布局元素</div>
                                        <div className="helper-description">因为布局元素默认是没有宽高的，想要选中或者拖动，可以通过在树中选择，或者点击小眼睛后将其显示出来</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/1ad5ad6eddc451da19090106befd5266d116325b.jpg"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="helper-title-container">
                                        <div className="helper-title">改变右工具栏宽度</div>
                                        <div className="helper-description">通过拖拽调节宽度</div>
                                    </div>
                                    <div className="image-container">
                                        <img className="image"
                                             src="http://hiphotos.baidu.com/fex/%70%69%63/item/9d82d158ccbf6c81963a9504b43eb13532fa40c8.jpg"/>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </Modal>
                </div>
            </div>
        )
    }
}