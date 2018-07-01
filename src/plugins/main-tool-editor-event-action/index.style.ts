import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const Label = styled.div`
  font-size: 13px;
  color: #666;
  margin-bottom: 5px;
  white-space: nowrap;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 0;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const DataContainer = styled.div`
  margin-top: 10px;
  flex-basis: 0;
`;
