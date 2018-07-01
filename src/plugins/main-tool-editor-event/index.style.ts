import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const TabTitle = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  font-size: 14px;
  color: #666;
  background-color: #eee;
  width: 100%;
  font-weight: bold;
`;

export const AddButton = styled.div`
  margin-left: 10px;
  fill: #666;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    fill: #333;
  }
`;

export const EventContainer = styled.div`
  position: relative;
  display: flex;
  height: 100px;
  padding: 10px;
  flex-direction: row;
  &:not(:last-child) {
    border-bottom: 1px dotted #ddd;
  }
`;

export const EventTrigger = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
  margin-right: 5px;
`;

export const EventAction = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 0;
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RemoveIconContainer = styled.div`
  position: absolute;
  right: 10px;
  top: 12px;
  fill: #999;
  cursor: pointer;
  transition: color 0.3s;
  &:hover {
    fill: #333;
  }
`;
