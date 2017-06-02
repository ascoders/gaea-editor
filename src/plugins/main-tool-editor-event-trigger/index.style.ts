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

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const CallbackItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  padding-top: 5px;
  color: #666;
`

export const ParamLabel = styled.div`
  color: #666;
  border: 1px dotted #ddd;
  padding: 2px 5px;
  border-radius: 3px;
  margin-right: 10px;
  background-color: #eee;
`
