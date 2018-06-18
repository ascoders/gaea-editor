import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  color: #666;
`;

export const ModelContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: -85px;
  top: 39px;
  width: 200px;
  height: 120px;
  background-color: white;
  border: 1px solid #ddd;
  z-index: 10;
  cursor: default;
`;

export const ViewModeItem = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  cursor: pointer;
  &.active,
  &:hover {
    background-color: whitesmoke;
  }
`;

export const ViewModeText = styled.div`
  margin-left: 5px;
  font-size: 13px;
`;
