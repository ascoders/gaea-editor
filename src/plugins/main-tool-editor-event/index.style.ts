import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: whitesmoke;
`

export const TabTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 13px;
  color: #666;
  background-color: #eee;
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

export const EventContainer = styled.div`
  position: relative;
  display: flex;
  padding: 10px 0 10px 25px;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`

export const EventLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`

export const EventRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
`

export const RemoveIconContainer = styled.div`
  position: absolute;
  left: 5px;
  top: 18px;
  background-color: whitesmoke;
  fill: #999;
  cursor: pointer;
  transition: color .3s;
  &:hover {
    fill: #333;
  }
`
