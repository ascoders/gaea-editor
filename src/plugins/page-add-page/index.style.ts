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
  border-bottom: 1px solid #ddd;
`;

export const TitleLeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const RemoveButtonContainer = styled.div`
  fill: #666;
  cursor: pointer;
  margin-left: 5px;
  &:hover {
    fill: #333;
  }
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

export const FormTitle = styled.div`
  padding: 15px 10px;
  font-size: 15px;
  font-weight: bold;
  color: #666;
`;

export const Description = styled.div`
  display: flex;
  color: #777;
  font-size: 14px;
  margin-left: 10px;
  margin-top: 7px;
  align-items: center;
`;

export const RealPath = styled.div`
  margin-left: 5px;
  padding: 2px 5px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background-color: #eee;
  color: green;
`;

export const Button = styled.div`
  width: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  border: 1px solid #ddd;
  background-color: #eee;
  border-radius: 5px;
  margin-top: 20px;
  margin-left: 10px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: white;
    color: #333;
  }
`;
