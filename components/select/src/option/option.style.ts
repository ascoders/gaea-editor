import styled, { css, injectGlobal } from "styled-components"

const active = css`
  background: #f8f9fb;
`

export const Container = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover:not(.disabled), &.active {
    background: #f8f9fb;
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
