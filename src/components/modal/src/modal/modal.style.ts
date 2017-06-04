import styled from "styled-components"

export const Container = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
`

export const Block = styled.div`
  background-color: whitesmoke;
  border: 1px solid #999;
  border-radius: 5px;
  width: 70%;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`
