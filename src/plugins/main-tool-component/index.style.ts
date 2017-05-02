import styled from "styled-components"

export const Component = styled.div`
  cursor: pointer;
  padding: 10px;
  font-size: 14px;
  color: #666;
  transition: background-color .3s;
  &:hover {
    background-color: whitesmoke;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`
