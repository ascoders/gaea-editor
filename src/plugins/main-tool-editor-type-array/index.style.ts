import styled from 'styled-components';

export const Container = styled.div`
  padding: 5px 0 5px 10px;
  margin-left: 10px;
  display: flex;
  flex-grow: 1;
`;

export const AddButton = styled.div`
  display: flex;
  margin-right: 10px;
  fill: #666;
  cursor: pointer;
  transition: color 0.3s;
  margin-left: -10px;
  &:hover {
    fill: #333;
    background-color: white;
  }
  transition: background-color 0.3s;
  background-color: #eee;
  border: 1px solid #ddd;
  padding: 2px 3px;
  border-radius: 3px;
`;

export const ListContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  border-left: 1px solid #ddd;
`;

export const ChildContainer = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
`;

export const EachItem = styled.div`
  position: relative;
  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

export const RemoveIconContainer = styled.div`
  position: absolute;
  left: -7px;
  top: calc(50% - 7px);
  background-color: whitesmoke;
  fill: #999;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    fill: #333;
  }
`;
