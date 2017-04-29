import { Connect } from "dynamic-react"
import * as React from "react"

import { StoreProps } from "../stores"

import Viewport from "./viewport/viewport.component"

class Props extends StoreProps {

}

class State {

}

import * as Styled from "./page.style"

@Connect
export default class Page extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    /**
     * 关闭编辑框
     */
    public handleCloseEditor = () => {
        // this.props.ViewportAction.setCurrentEditComponentMapUniqueKey(null)
    }

    /**
     * 关闭左边工具栏
     */
    public handleCloseLeftBar = () => {
        // this.props.ApplicationActionAction.toggleLeftBar(null)
    }

    public render() {
        // const navbarBottomRightContainerClasses = classNames({
        // 'navbar-center__right-container': true,
        // 'show-editor-container': this.props.ViewportStore.currentEditComponentMapUniqueKey !== null,
        // 'transparent-background': this.props.ApplicationActionStore.viewportContainerStyle.backgroundColor === 'transparent',
        // 'show-left-bar': this.props.ApplicationActionStore.leftBarType !== null
        // })

        // .15s 后触发视图区域刷新事件
        setTimeout(() => {
            // this.props.EventAction.emit(this.props.EventStore.viewportUpdated)
        }, 200)

        return (
            <Styled.Container>
                <Styled.LeftContainer>
                    <Styled.NavbarContainer
                        style={{ height: this.props.stores.ApplicationStore.navbarHeight }}>
                        <Styled.NavbarContainerLeft>
                            {this.props.actions.ApplicationAction.loadingPluginByPosition("navbarLeft")}
                        </Styled.NavbarContainerLeft>
                        <Styled.NavbarContainerRight>
                            {this.props.actions.ApplicationAction.loadingPluginByPosition("navbarRight")}
                        </Styled.NavbarContainerRight>
                    </Styled.NavbarContainer>
                    <Styled.ViewportContainer>
                        <Styled.ViewportContainerLeft>
                            <Styled.ViewportContainerLeftTop>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("leftBarTop")}
                            </Styled.ViewportContainerLeftTop>
                            <Styled.ViewportContainerLeftBottom>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("leftBarBottom")}
                            </Styled.ViewportContainerLeftBottom>
                        </Styled.ViewportContainerLeft>
                        <Styled.ViewportContainerRight
                            style={Object.assign({}, this.props.stores.ApplicationStore.viewportContainerStyle)}>
                            <Styled.ToolsContainer>
                                {/*<LeftBar />*/}
                                <Styled.ToolsContainerClose onClick={this.handleCloseLeftBar}>
                                    {/*<i className="fa fa-close close-button"/>*/}
                                </Styled.ToolsContainerClose>
                            </Styled.ToolsContainer>

                            <Styled.ViewportContainerBox
                                style={Object.assign({}, this.props.stores.ApplicationStore.viewportStyle, { display: this.props.stores.ApplicationStore.isPreview ? "none" : null })}>
                                <Viewport />
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("viewport")}
                            </Styled.ViewportContainerBox>

                            {this.props.stores.ApplicationStore.isPreview &&
                                <Styled.PreviewContainer
                                    style={Object.assign({}, this.props.stores.ApplicationStore.viewportStyle)}>
                                    {/*<Preview value={this.props.ViewportAction.getIncrementComponentsInfo()}*/}
                                    {/*baseComponents={this.props.ApplicationActionStore.editorProps.commonComponents}*/}
                                    {/*customComponents={this.props.ApplicationActionStore.editorProps.customComponents}/>*/}
                                    {this.props.actions.ApplicationAction.loadingPluginByPosition("preview")}
                                </Styled.PreviewContainer>
                            }

                            <Styled.EditorContainer>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("editor")}
                                <Styled.EditorContainerClose onClick={this.handleCloseEditor}>
                                    {/*<i className="fa fa-close close-button"/>*/}
                                </Styled.EditorContainerClose>
                            </Styled.EditorContainer>
                        </Styled.ViewportContainerRight>
                    </Styled.ViewportContainer>
                    <Styled.FooterContainer>
                        {this.props.actions.ApplicationAction.loadingPluginByPosition("bottomBar")}
                    </Styled.FooterContainer>
                </Styled.LeftContainer>
                <Styled.RightContainer>
                    <Styled.SidebarMoveContainer>
                        <Styled.SidebarViewportContainer>
                            <Styled.SidebarViewportContainerTop>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolTop")}
                            </Styled.SidebarViewportContainerTop>
                            <Styled.SidebarViewportContainerBottom>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("mainToolBottom")}
                            </Styled.SidebarViewportContainerBottom>
                        </Styled.SidebarViewportContainer>
                        <Styled.SidebarPreviewContainer>
                            您处于预览状态
                        </Styled.SidebarPreviewContainer>
                    </Styled.SidebarMoveContainer>
                </Styled.RightContainer>
            </Styled.Container>
        )
    }
}
