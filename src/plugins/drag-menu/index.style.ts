import styled from 'styled-components';

export const Component = styled.div`
  display: flex;
  align-items: center;
  height: 30px;
  padding: 0 10px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  background-color: #eee;
  transition: background-color 0.3s;
  &:hover {
    background-color: white;
  }
  border-bottom: 1px solid #ddd;
`;

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

export const CloseContainer = styled.div`
  padding: 5px;
  cursor: pointer;
  fill: #999;
  align-items: center;
  &:hover {
    fill: #333;
  }
`;

export const SearchInput = styled.input`
  outline: none;
  padding: 5px 10px;
  font-size: 14px;
  color: #666;
  border-right: none;
  border-left: none;
  border-top: none;
  border-bottom: 1px solid #ddd;
  background-color: #fbfbfb;
  &:focus {
    background-color: white;
    color: #333;
  }
  &::-webkit-input-placeholder {
    color: #999;
  }
`;

export const ListContainer = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  flex-basis: 0;
`;
