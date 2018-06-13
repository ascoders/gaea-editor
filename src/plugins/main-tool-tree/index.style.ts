import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  border-top: 1px solid #ddd;
  flex-grow: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const TreeContainer = styled.div`
  position: relative;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const AbsoluteContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px;
  background-color: white;
  font-size: 12px;
  color: #666;
`;
