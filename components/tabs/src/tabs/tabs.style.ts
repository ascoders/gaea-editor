import styled from "styled-components"

export const Container = styled.div.withConfig({ componentId: "tabs-container" }) `
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TitleContainer = styled.div.withConfig({ componentId: "title-container" }) `
  display: flex;
  position: relative;
  height: 40px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  background-color: whitesmoke;
  color: #666;
`

export const TitleItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    color: #146f8c;
  }
  ${(props: any) => props.theme.active && `
    color: #146f8c;
    cursor: default;
  `}
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`

export const MoveBar = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: -1px;
  box-sizing: border-box;
  height: 2px;
  background-color: #2db7f5;
  transform: scaleX(1);
  transform-origin: 0 0;

  ${(props: any) => props.theme.forward && `
    transition: right .3s cubic-bezier(.645, .045, .355, 1), left .3s cubic-bezier(.645, .045, .355, 1) .09s;
  `}

  ${(props: any) => props.theme.backward && `
    transition: right .3s cubic-bezier(0.65, 0.05, 0.36, 1) .09s, left .3s cubic-bezier(.645, .045, .355, 1);
  `}
`
