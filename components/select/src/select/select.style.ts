import styled from "styled-components"

export const Container = styled.div`
  padding: 10px 15px;
  cursor: pointer;
`

export const ChosenDrop = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 45px;
  top: 32px;
  z-index: 10;

  background: whitesmoke;
  color: #666;
  border-radius: 3px;
  text-align: center;
  box-shadow: 0 0 0 1px rgba(16, 22, 26, 0.1), 0 2px 4px rgba(16, 22, 26, 0.15), 0 8px 24px rgba(216, 216, 216, 0.15);
  white-space: nowrap;
  font-size: 14px;
  text-shadow: 0 1px 1px whitesmoke;
`

export const ChosenResults = styled.div`
  display: flex;
  flex-direction: column;
`
