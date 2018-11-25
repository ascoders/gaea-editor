import styled, { css } from 'styled-components';

const NavbarContainerLeftAndNavbarContainerRight = css`
  & > div:not(.no-style) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
    color: #666;
    &:hover {
      background-color: white;
      color: #333;
    }
  }
`;

const ViewportContainerBoxAndPreviewContainer = css`
  display: block;
  position: relative;
  height: 100%;
  ${(props: any) =>
    props.theme.hidden &&
    `
        display: none;
    `};
`;

export const Container = (styled.div as any).withConfig({ componentId: 'Container' })`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const LeftContainer = (styled.div as any).withConfig({ componentId: 'LeftContainer' })`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 0;
`;

export const RightContainer = (styled.div as any).withConfig({ componentId: 'RightContainer' })`
  display: flex;
  width: 300px;
  z-index: 2;
  background-color: white;
  overflow: hidden;
  border-left: 1px solid #ddd;

  ${(props: any) =>
    props.theme.hidden &&
    `
        display: none;
    `};
`;

export const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;
  border-bottom: 1px solid #ddd;
`;

export const NavbarContainerLeft = styled.div`
  display: flex;
  & > div:not(.no-style) {
    border-right: 1px solid #ddd;
  }
  ${NavbarContainerLeftAndNavbarContainerRight};
`;

export const NavbarContainerRight = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div:not(.no-style) {
    border-left: 1px solid #ddd;
  }
  ${NavbarContainerLeftAndNavbarContainerRight};
`;

export const ViewportContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 0;
`;

export const ViewportContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40px;
  background-color: white;
  z-index: 1;
  background-color: whitesmoke;
  border-right: 1px solid #ddd;
  ${(props: any) =>
    props.theme.hidden &&
    `
        display: none;
    `};
`;

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
      background-color: white;
    }
  }
`;

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
`;

export const ViewportContainerRight = styled.div`
  display: flex;
  margin-left: -300px;
  flex-grow: 1;
  width: 0;
  transition: all 0.15s;
  ${(props: any) =>
    props.theme.transparent &&
    `
        //background-image: url('../images/transparent.png');
    `} ${(props: any) =>
    props.theme.showLeft &&
    `
        margin-left: 0;
    `};
`;

export const ViewportBackground = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-image: url(data:image/png;base64,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);
`;

export const FooterContainer = styled.div`
  display: flex;
  height: 30px;
  border-top: 1px solid #ddd;
  background-color: whitesmoke;
`;

export const ToolsContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: whitesmoke;
  position: relative;
  width: 300px;
  ${(props: any) =>
    props.theme.fullScreen &&
    `
       width: 100%;
    `};
`;

export const ToolsContainerLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  border-right: 1px solid #ddd;
`;

export const ToolsContainerRight = styled.div`
  display: flex;
  flex-direction: column;
  display: none;
  flex-grow: 1;
  flex-basis: 0%;
  ${(props: any) =>
    props.theme.show &&
    `
       display: block;
    `};
`;

export const ViewportContainerBox = styled.div`
  ${ViewportContainerBoxAndPreviewContainer} overflow-x: hidden;
`;

export const PreviewContainer = styled.div`
  ${ViewportContainerBoxAndPreviewContainer} overflow-y: auto;
`;

export const ModalTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 45px;
  padding: 0 15px;
  border-bottom: 1px solid #ddd;
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  color: #666;
  font-weight: bold;
`;

export const ModalTitleClose = styled.div`
  display: flex;
  align-items: center;
  fill: #999;
  cursor: pointer;
  &:hover {
    fill: #333;
  }
`;

export const ViewportAndPreviewContainer = styled.div`
  background-color: white;
  margin: auto;
`;
