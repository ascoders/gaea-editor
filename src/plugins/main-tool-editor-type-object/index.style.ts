import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px 0 5px 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const ChildContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

export const EachItem = styled.div`
  position: relative;
  border-left: 1px solid #ddd;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;
