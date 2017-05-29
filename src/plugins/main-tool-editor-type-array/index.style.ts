import styled from "styled-components"

export const Container = styled.div`
  padding: 5px 0 5px 10px;
  display: flex;
  flex-direction: column;
`

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #666;
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 1px solid #ddd;
  margin-top: 5px;
`

export const AddButton = styled.div`
  margin-left: 10px;
  fill: #666;
  cursor: pointer;
  transition: color .3s;
  &:hover {
    fill: #333;
  }
`

export const ChildContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
`

export const EachItem = styled.div`
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`

export const RemoveIconContainer = styled.div`
  position: absolute;
  left: -7px;
  top: calc(50% - 7px);
  background-color: whitesmoke;
  fill: #999;
  cursor: pointer;
  transition: color .3s;
  &:hover {
    fill: #333;
  }
`
