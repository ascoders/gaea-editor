import styled, { css, injectGlobal } from "styled-components"

export const Input = styled.input`
  padding: 5px;
  outline: none;
  font-size: 14px;
  color: #666;
  border: 1px solid #ddd;
  margin: 0 10px;
  background-color: #fbfbfb;
  border-radius: 3px;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    background-color: white;
    border-color: #88a1c1;
    color: #333;
  }
  ${(props: any) => props.theme.disabled && `
    background-color: #eee;
    cursor: not-allowed;
  `}
`
