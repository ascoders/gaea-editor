import styled, { css, injectGlobal } from "styled-components"

const active = css`
  background: #f8f9fb;
  border-left: 2px solid $primary-color;
  padding-left: 13px !important;
`

export const Container = styled.li`
  padding: 10px 15px !important;
  cursor: pointer;
  &:hover:not(.disabled), &.active {
    background: #f8f9fb;
    border-left: 2px solid $primary-color;
    padding-left: 13px !important;
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
