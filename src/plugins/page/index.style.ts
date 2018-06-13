import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: whitesmoke;
  flex-grow: 1;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 40px;
  font-size: 16px;
  align-items: center;
  color: #777;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
`;

export const TitleLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TitleRightContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const CloseContainer = styled.div`
  padding: 5px;
  cursor: pointer;
  fill: #999;
  align-items: center;
  &:hover {
    fill: #333;
  }
`;

export const AddIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  border: 1px solid #ddd;
  border-radius: 3px;
  fill: #555;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: white;
  }
  & + & {
    margin-left: 5px;
  }
`;

export const EmptyContainer = styled.div`
  flex-grow: 1;
  background-color: whitesmoke;
`;

export const EmptyTitle = styled.div`
  display: flex;
  justify-content: center;
  color: #888;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
  font-size: 14px;
`;

export const EmptyDescription = styled.div`
  margin: 15px 10px 0 10px;
  padding: 20px;
  color: #888;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-size: 13px;
  background-color: #e8e8e8;
`;
