import { Connect } from "dynamic-react"
import Render from "gaea-render"
import * as _ from "lodash"
import * as React from "react"
import Icon from "../../components/icon/src"
import { Modal } from "../../components/modal/src"
import { StoreProps } from "../stores"
import Viewport from "./viewport/viewport.component"

class Props extends StoreProps<void, void> {
    public componentClasses?: Array<React.ComponentClass<IGaeaProps>> = []
}

class State {

}

import * as Styled from "./page.style"

@Connect
export default class Page extends React.Component<Props, State> {
    public static defaultProps = new Props()
    public state = new State()

    public render() {
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
                        <Styled.ViewportContainerLeft theme={{ hidden: this.props.stores.ApplicationStore.isPreview }}>
                            <Styled.ViewportContainerLeftTop>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("leftBarTop")}
                            </Styled.ViewportContainerLeftTop>
                            <Styled.ViewportContainerLeftBottom>
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("leftBarBottom")}
                            </Styled.ViewportContainerLeftBottom>
                        </Styled.ViewportContainerLeft>

                        <Styled.ViewportContainerRight
                            theme={{ showLeft: this.props.stores.ApplicationStore.leftTool }}
                            style={Object.assign({}, this.props.stores.ApplicationStore.viewportContainerStyle)}>
                            <Styled.ToolsContainer theme={{ fullScreen: this.props.stores.ApplicationStore.rightTool }}>
                                <Styled.ToolsContainerLeft>
                                    {this.props.actions.ApplicationAction.loadingPluginByPosition(`toolContainerLeft${_.upperFirst(_.camelCase(this.props.stores.ApplicationStore.leftTool))}`)}
                                </Styled.ToolsContainerLeft>
                                <Styled.ToolsContainerRight theme={{ show: this.props.stores.ApplicationStore.rightTool }}>
                                    {this.props.actions.ApplicationAction.loadingPluginByPosition(`toolContainerRight${_.upperFirst(_.camelCase(this.props.stores.ApplicationStore.rightTool))}`)}
                                </Styled.ToolsContainerRight>
                            </Styled.ToolsContainer>

                            <Styled.ViewportContainerBox
                                theme={{ hidden: this.props.stores.ApplicationStore.rightTool }}
                                style={Object.assign({}, this.props.stores.ApplicationStore.viewportStyle, { display: this.props.stores.ApplicationStore.isPreview ? "none" : null })}>
                                <Viewport />
                                {this.props.actions.ApplicationAction.loadingPluginByPosition("viewport")}
                            </Styled.ViewportContainerBox>

                            {this.props.stores.ApplicationStore.isPreview &&
                                <Styled.PreviewContainer
                                    theme={{ hidden: this.props.stores.ApplicationStore.rightTool }}
                                    style={Object.assign({}, this.props.stores.ApplicationStore.viewportStyle)}>
                                    <Render value={this.props.stores.ViewportStore.currentFullInformation} componentClasses={this.props.componentClasses} />
                                    {this.props.actions.ApplicationAction.loadingPluginByPosition("preview")}
                                </Styled.PreviewContainer>
                            }

                        </Styled.ViewportContainerRight>
                    </Styled.ViewportContainer>

                    <Styled.FooterContainer>
                        {this.props.actions.ApplicationAction.loadingPluginByPosition("bottomBar")}
                    </Styled.FooterContainer>
                </Styled.LeftContainer>

                <Styled.RightContainer theme={{ hidden: this.props.stores.ApplicationStore.isPreview }}>
                    {this.props.actions.ApplicationAction.loadingPluginByPosition("mainTool")}
                </Styled.RightContainer>

                <Modal show={this.props.stores.ApplicationStore.isShowModal}>
                    <Styled.ModalTitleContainer>
                        <Styled.ModalTitle>
                            {this.props.stores.ApplicationStore.modalTitle}
                        </Styled.ModalTitle>
                        <Styled.ModalTitleClose onClick={this.handleModalClick}>
                            <Icon type="close" />
                        </Styled.ModalTitleClose>
                    </Styled.ModalTitleContainer>
                    {this.props.actions.ApplicationAction.renderModalContent()}
                </Modal>
            </Styled.Container>
        )
    }

    private handleModalClick = () => {
        this.props.actions.ApplicationAction.closeModal()
    }
}
