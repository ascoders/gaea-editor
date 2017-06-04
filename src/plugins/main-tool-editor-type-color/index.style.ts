import styled from "styled-components"

export const Container = styled.div`
  padding: 5px 0 5px 0;
  display: flex;
  align-items: center;
  flex-grow: 1;
  margin-right: 35px;
`

export const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  &:hover {
    border-color: #ccc;
  }
`

export const ColorBox = styled.div`
  width: 15px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid #eee;
`
