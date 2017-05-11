import styled, { css } from "styled-components"

const NavbarContainerLeftAndNavbarContainerRight = css`
    & > div:not(.no-style) {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        font-size: 14px;
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
    flex-basis: 0%;
    flex-grow: 1;
    ${(props: any) => props.theme.hidden && `
        display: none;
    `}
`

export const Container = styled.div.withConfig({ componentId: "Container" }) `
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
`

export const LeftContainer = styled.div.withConfig({ componentId: "LeftContainer" }) `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    width: 0;
`

export const RightContainer = styled.div.withConfig({ componentId: "RightContainer" }) `
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
    width: 40px;
    background-color: white;
    z-index: 1;
    background-color: whitesmoke;
    border-right: 1px solid #ddd;
`

export const ViewportContainerLeftTop = styled.div`
    width: 100%;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        height: 40px;
        fill: #666;
        cursor: pointer;
        user-select: none;
        border-bottom: 1px solid #ddd;
        &:hover {
            background-color: #eaeaea;
        }
    }
`

export const ViewportContainerLeftBottom = styled.div`
    width: 100%;
    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        height: 30px;
        cursor: pointer;
        user-select: none;
        &:hover {
            background-color: #eaeaea;
        }
    }
`

export const ViewportContainerRight = styled.div`
    display: flex;
    margin-left: -300px;
    flex-grow: 1;
    width: 0;
    transition: all .15s;
    ${(props: any) => props.theme.transparent && `
        //background-image: url('../images/transparent.png');
    `}
    ${(props: any) => props.theme.showLeft && `
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
    flex-direction: column;
    flex-grow: 1;
    height: 0;
`

export const FooterContainer = styled.div`
    display: flex;
    height: 30px;
    border-top: 1px solid #ddd;
    background-color: whitesmoke;
`

export const ToolsContainer = styled.div`
    display: flex;
    flex-direction: row;
    background-color: whitesmoke;
    position: relative;
    width: 300px;
    ${(props: any) => props.theme.fullScreen && `
       width: 100%;
    `}
`

export const ToolsContainerLeft = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    border-right: 1px solid #ddd;
`

export const ToolsContainerRight = styled.div`
    display: flex;
    flex-direction: column;
    display: none;
    flex-grow: 1;
    flex-basis: 0%;
    ${(props: any) => props.theme.show && `
       display: block;
    `}
`

export const ViewportContainerBox = styled.div`
    ${ViewportContainerBoxAndPreviewContainer}
`

export const PreviewContainer = styled.div`
    ${ViewportContainerBoxAndPreviewContainer}
`
