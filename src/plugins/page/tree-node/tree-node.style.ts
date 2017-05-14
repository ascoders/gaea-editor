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
  ${(props: any) => props.theme.isHome && `
    color: #8e604c;
    &:hover {
      color: #b58069;
    }
  `}
`

export const UnNamed = styled.span`
  color: #9597ce;
`

export const RightContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
`

export const Setting = styled.span`
  fill: #666;
  cursor: pointer;
  &:hover {
    fill: #333;
  }
`

export const InUseTag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
  padding: 0 5px;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: 12px;
  margin-right: 5px;
  background-color: #73ca73;
  color: white;
  text-shadow: 0px 0px 1px #313131;
`
