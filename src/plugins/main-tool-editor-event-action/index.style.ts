import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  background-color: whitesmoke;
`

export const Label = styled.div`
  font-size: 14px;
  color: #666;
  margin-right: 5px;
  white-space: nowrap;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const ActionSiblingContainer = styled.div`
  display: flex;
  padding-top: 5px;
  align-items: center;
  justify-content: space-between;
`

export const IconContainer = styled.div`
  fill: #666;
`
