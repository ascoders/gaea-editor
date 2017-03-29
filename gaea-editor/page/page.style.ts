import styled, {css} from 'styled-components'

const NavbarContainerLeftAndNavbarContainerRight = css`
    & > div:not(.no-style) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        &:hover {
            background-color: #eaeaea;
        }
    }
`

const ViewportContainerBoxAndPreviewContainer = css`
    display: flex;
    position: relative;
    width: 0;
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
    margin: 0 auto;
`

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 0;
`

export const RightContainer = styled.div`
    display: flex;
    width: 300px;
    z-index: 2;
    background-color: white;
    overflow: hidden;
    border-left: 1px solid #ddd;

    // 修复 safari 被盖在编辑区下面的问题
    transform: translateZ(1px);
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: whitesmoke;
    border-bottom: 1px solid #ddd;
`

export const NavbarContainerLeft = styled.div`
    display: flex;
    ${NavbarContainerLeftAndNavbarContainerRight}
`

export const NavbarContainerRight = styled.div`
    display: flex;
    justify-content: flex-end;
    ${NavbarContainerLeftAndNavbarContainerRight}
`

export const ViewportContainer = styled.div`
    display: flex;
    flex-grow: 1;
    height: 0;
`

export const ViewportContainerLeft = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    background-color: white;
    z-index: 1;
`

export const ViewportContainerLeftTop = styled.div`
    width: 100%;
`

export const ViewportContainerLeftBottom = styled.div`
    width: 100%;
`

export const ViewportContainerRight = styled.div`
    display: flex;
    margin-left: -300px;
    margin-right: -350px;
    flex-grow: 1;
    width: 0;
    transition: all .15s;
    ${props => props.theme.transparent && `
        //background-image: url('../images/transparent.png');
    `}
    ${props => props.theme.showRight && `
        margin-right: 0;
    `}
    ${props => props.theme.showLeft && `
        margin-left: 0;
    `}
`

export const SidebarMoveContainer = styled.div`
    display: flex;
    transition: all .3s;
    transform: translate3d(0, 0, 0);
`

export const SidebarViewportContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
`

export const SidebarPreviewContainer = styled.div`
    display: flex;
    width: 300px;
    height: 100%;
`

export const SidebarViewportContainerTop = styled.div`
    display: flex;
    flex-grow: 2;
    height: 0;
`

export const SidebarViewportContainerBottom = styled.div`
    display: flex;
    flex-grow: 3;
    height: 0;
`

export const FooterContainer = styled.div`
    display: flex;
    height: 30px;
    border-top: 1px solid #ddd;
    background-color: whitesmoke;
`

export const ToolsContainer = styled.div`
    background-color: whitesmoke;
    position: relative;
    width: 300px;
    z-index: 0;
    display: flex;
    flex-direction: column;
`

export const ToolsContainerClose = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s;
    color: #999;
    cursor: pointer;
    z-index: 1;
    
    &:hover {
        color: #333;
        transform: scale(1.2);
    }
`

export const ViewportContainerBox = styled.div`
    ${ViewportContainerBoxAndPreviewContainer}
`

export const PreviewContainer = styled.div`
    ${ViewportContainerBoxAndPreviewContainer}
`

export const EditorContainer = styled.div`
    background-color: whitesmoke;
    position: relative;
    width: 350px;
    z-index: 0;
    display: flex;
    flex-direction: column;
    // 因为经常移动，单独放在一个图层
    transform: translateZ(0);
`

export const EditorContainerClose = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .3s;
    color: #999;
    cursor: pointer;
    z-index: 1;
    
    &:hover {
        color: #333;
        transform: scale(1.2);
    }
`