import styled from "styled-components"

export const EmptyContainer = styled.div`
  flex-grow: 1;
  background-color: whitesmoke;
`

export const EmptyTitle = styled.div`
  display: flex;
  justify-content: center;
  color: #888;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
`

export const EmptyDescription = styled.div`
  margin: 15px 10px 0 10px;
  padding: 20px;
  color: #888;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 13px;
  background-color: #e8e8e8;
`

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
`

export const CloseButton = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
  fill: #999;
  &:hover {
    fill: #333;
  }
`
