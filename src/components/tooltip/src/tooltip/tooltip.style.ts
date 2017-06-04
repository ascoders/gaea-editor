import styled from "styled-components"

const borderColor = "#ddd"

export const Container = styled.div`
  visibility: hidden;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity .3s;

  ${(props: any) => props.theme.active && `
    opacity: 1;
    visibility: visible;
  `}

  ${(props: any) => props.theme.position === "top" && `
    &::after {
      content: " ";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border: 5px solid transparent;
      border-top-color: ${borderColor};
      ${!props.theme.showArrow && `
        border: none;
      `}
    }
  `}

  ${(props: any) => props.theme.position === "right" && `
    &::after {
      content: " ";
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -5px;
      margin-left: -10px;
      border: 5px solid transparent;
      border-right-color: ${borderColor};
      ${!props.theme.showArrow && `
        border: none;
      `}
    }
  `}

  ${(props: any) => props.theme.position === "bottom" && `
    &::after {
      content: " ";
      position: absolute;
      top: 0;
      left: 50%;
      margin-left: -5px;
      margin-top: -10px;
      border: 5px solid transparent;
      border-bottom-color: ${borderColor};
      ${!props.theme.showArrow && `
        border: none;
      `}
      }
  `}

  ${(props: any) => props.theme.position === "left" && `
   &::after {
      content: " ";
      position: absolute;
      top: 50%;
      left: 100%;
      margin-top: -5px;
      margin-right: -10px;
      border: 5px solid transparent;
      border-left-color: ${borderColor};
      ${!props.theme.showArrow && `
        border: none;
      `}
    }
  `}
`

export const DefaultTitle = styled.div`
  background: whitesmoke;
  color: #666;
  border-radius: 3px;
  text-align: center;
  padding: 6px 10px;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.15), 0 8px 24px rgba(216, 216, 216, 0.15);
  white-space: nowrap;
  font-size: 14px;
  text-shadow: 0 1px 1px whitesmoke;
`

export const TooltipShallow = styled.div`
  display: none;
  width: 100 %;
  height: 100 %;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0.3;
  backgroundColor: black;
  ${(props: any) => props.theme.isShow && `
    display: block;
  `}
  ${(props: any) => props.theme.zIndex && `
    zIndex: ${props.theme.zIndex};
  `}
`
