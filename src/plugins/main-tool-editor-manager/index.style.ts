import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: whitesmoke;
`

export const ComponentName = styled.div`
  display: flex;
  padding: 7px 10px;
  font-size: 14px;
  color: #666;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`

export const TabTitle = styled.div`
  padding: 5px 10px;
  font-size: 13px;
  color: #666;
  background-color: #eee;
  width: 100%;
`

export const EditorContainer = styled.div`
  display: flex;
  position: relative;
  padding-left: 10px;
  justify-content: space-between;
  ${(props: any) => props.theme.isObjectType && `
    flex-direction: column;
    justify-content: flex-start;
  `}
`

export const EditorBoxContainer = styled.div`

`

export const Variable = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: -5px;
  top: 0;
  width: 30px;
  height: 20px;
  background-color: #eee;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
  border-bottom-left-radius: 5px;
  cursor: pointer;
  fill: #666;
  &:hover {
    background-color: white;
    fill: #333;
  }
  ${(props: any) => props.theme.isVariable && `
    background-color: #cef1ff;
    &:hover {
      background-color: #e4f7ff;
    }
  `}
`

export const Label = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  padding: 5px 0;
  ${(props: any) => props.theme.isObjectType && `
    align-items: flex-start;
  `}
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
