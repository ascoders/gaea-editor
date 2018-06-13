import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
  margin: 10px 15px;
  padding: 5px;
  border: 1px solid #eee;
  border-radius: 5px;

  .rotate-45 {
    transform: rotate(45deg);
  }

  .rotate-90 {
    transform: rotate(90deg);
  }

  .rotate-135 {
    transform: rotate(135deg);
  }

  .rotate-180 {
    transform: rotate(180deg);
  }

  .rotate-270 {
    transform: rotate(270deg);
  }
`;

export const DisplayContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FlexRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
