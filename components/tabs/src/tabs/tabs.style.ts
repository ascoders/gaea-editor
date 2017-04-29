import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const TitleContainer = styled.div`
  display: flex;
  position: relative;
  height: 30px;
`

export const TitleItem = styled.div`
  cursor: pointer;
  padding: 5px 10px 10px 10px;
  ${(props: any) => props.theme.active && `
    color: #23b7e5;
    cursor: default;
  `}
`

export const ContentContainer = styled.div`
  padding: 0 10px;
  flex-grow: 1;
  flex-basis: 0;
`

export const MoveBar = styled.div`
  z-index: 1;
  position: absolute;
  left: 0;
  bottom: 0;
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
