import styled from "styled-components"

const activeBorderColor = "#35b8d6"

export const Container = styled.div.withConfig({ componentId: "plugin-tree-node-container" }) `
  display: flex;
  background-color: #eee;
  color: #666;
  font-size: 14px;
`

export const Content = styled.div.withConfig({ componentId: "plugin-tree-node-content" }) `
  display: flex;
  flex-grow: 1;
  align-items: center;
  height: 30px;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  transition: border-right-color .3s;
  border-right: 3px solid transparent;
  &:hover {
    border-right-color: ${activeBorderColor};
  }
  ${(props: any) => props.theme.editted && `
    border-right-color: ${activeBorderColor};
  `}
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
