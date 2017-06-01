import styled, { css, injectGlobal } from "styled-components"

const active = css`
  background: white;
  color: black;
`

export const Container = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover:not(.disabled), &.active {
    ${active}
  }
  ${(props: any) => props.theme.active && active}
  ${(props: any) => props.theme.disabled && `
    ${active}
    &:hover {
      cursor: not-allowed;
      background-color: whitesmoke;
    }
  `}
`

export const global = injectGlobal`
  .gaea-component-select-option-active {
    color: red;
  }
`
