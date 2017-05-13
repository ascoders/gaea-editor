import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  height: 30px;
  background-color: #eee;
  border-bottom: 1px solid #ddd;
  color: #666;
  font-size: 14px;
  transition: background-color .3s;
  &:hover {
    background-color: white;
  }
`

export const Content = styled.div.withConfig({ componentId: "plugin-tree-node-content" }) `
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.div`
  display: flex;
  align-items: center;
`

export const UnNamed = styled.span`
  color: #9597ce;
`

export const Setting = styled.span`
  margin-right: 15px;
  fill: #666;
  cursor: pointer;
  &:hover {
    fill: #333;
  }
`
