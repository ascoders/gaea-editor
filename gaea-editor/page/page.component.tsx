import * as React from 'react'
import { Connect } from 'dynamic-react'

import { StoreProps } from '../stores'

import Viewport from './viewport/viewport'

class Props extends StoreProps {

}

class State {

}

import {
    Container,
    LeftContainer,
    RightContainer,
    NavbarContainer,
    NavbarContainerLeft,
    NavbarContainerRight,
    ViewportContainer,
    ViewportContainerLeft,
    ViewportContainerLeftTop,
    ViewportContainerLeftBottom,
    ViewportContainerRight,
    SidebarMoveContainer,
    SidebarViewportContainer,
    SidebarPreviewContainer,
    SidebarViewportContainerTop,
    SidebarViewportContainerBottom,
    FooterContainer,
    ToolsContainer,
    ToolsContainerClose,
    ViewportContainerBox,
    PreviewContainer,
    EditorContainer,
    EditorContainerClose
} from './page.style'

@Connect
export default class Page extends React.Component<Props, State> {
    static defaultProps = new Props()
    public state = new State()

    componentWillMount() {

    }

    /**
     * 关闭编辑框
     */
    handleCloseEditor = () => {
        //this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(null)
    }

    /**
     * 关闭左边工具栏
     */
    handleCloseLeftBar = () => {
        //this.props.ApplicationActionAction.toggleLeftBar(null)
    }

    render() {
        //const navbarBottomRightContainerClasses = classNames({
        // 'navbar-center__right-container': true,
        //'show-editor-container': this.props.ViewportStore.currentEditComponentMapUniqueKey !== null,
        //'transparent-background': this.props.ApplicationActionStore.viewportContainerStyle.backgroundColor === 'transparent',
        //'show-left-bar': this.props.ApplicationActionStore.leftBarType !== null
        //})

        // .15s 后触发视图区域刷新事件
        setTimeout(() => {
            //this.props.EventAction.emit(this.props.EventStore.viewportUpdated)
        }, 200)

        return (
            <Container>
                <LeftContainer>
                    <NavbarContainer
                        style={{ height: this.props.stores.ApplicationStore.navbarHeight }}>
                        <NavbarContainerLeft>
                            {this.props.actions.ApplicationAction.loadingPluginByPosition('navbarLeft')}
                        </NavbarContainerLeft>
                        <NavbarContainerRight>
                            {this.props.actions.ApplicationAction.loadingPluginByPosition('navbarRight')}
                        </NavbarContainerRight>
                    </NavbarContainer>
                    <ViewportContainer>
                        <ViewportContainerLeft>
                            <ViewportContainerLeftTop>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition('leftBarTop')}
                            </ViewportContainerLeftTop>
                            <ViewportContainerLeftBottom>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition('leftBarBottom')}
                            </ViewportContainerLeftBottom>
                        </ViewportContainerLeft>
                        <ViewportContainerRight
                            style={Object.assign({}, this.props.stores.ApplicationStore.viewportContainerStyle)}>
                            <ToolsContainer>
                                {/*<LeftBar />*/}
                                <ToolsContainerClose onClick={this.handleCloseLeftBar}>
                                    {/*<i className="fa fa-close close-button"/>*/}
                                </ToolsContainerClose>
                            </ToolsContainer>

                            <ViewportContainerBox
                                style={Object.assign({}, this.props.stores.ApplicationStore.viewportStyle, { display: this.props.stores.ApplicationStore.isPreview ? 'none' : null })}>
                                <Viewport />
                                {this.props.actions.ApplicationAction.loadingPluginByPosition('viewport')}
                            </ViewportContainerBox>

                            {this.props.stores.ApplicationStore.isPreview &&
                                <PreviewContainer
                                    style={Object.assign({}, this.props.stores.ApplicationStore.viewportStyle)}>
                                    {/*<Preview value={this.props.ViewportAction.getIncrementComponentsInfo()}*/}
                                    {/*baseComponents={this.props.ApplicationActionStore.editorProps.commonComponents}*/}
                                    {/*customComponents={this.props.ApplicationActionStore.editorProps.customComponents}/>*/}
                                    {this.props.actions.ApplicationAction.loadingPluginByPosition('preview')}
                                </PreviewContainer>
                            }

                            <EditorContainer>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition('editor')}
                                <EditorContainerClose onClick={this.handleCloseEditor}>
                                    {/*<i className="fa fa-close close-button"/>*/}
                                </EditorContainerClose>
                            </EditorContainer>
                        </ViewportContainerRight>
                    </ViewportContainer>
                    <FooterContainer>
                        {this.props.actions.ApplicationAction.loadingPluginByPosition('bottomBar')}
                    </FooterContainer>
                </LeftContainer>
                <RightContainer>
                    <SidebarMoveContainer>
                        <SidebarViewportContainer>
                            <SidebarViewportContainerTop>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition('mainToolTop')}
                            </SidebarViewportContainerTop>
                            <SidebarViewportContainerBottom>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition('mainToolBottom')}
                            </SidebarViewportContainerBottom>
                        </SidebarViewportContainer>
                        <SidebarPreviewContainer>
                            您处于预览状态
                        </SidebarPreviewContainer>
                    </SidebarMoveContainer>
                </RightContainer>
            </Container>
        )
    }
}