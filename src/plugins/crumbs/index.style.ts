import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  background-color: whitesmoke;
`;

export const AutoWidthContainer = styled.div`
  display: flex;
  align-items: stretch;
`;

export const FooterItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 8px;
  color: #666;
  font-size: 13px;
  &:hover {
    cursor: pointer;
    color: #146f8c;
    transition: color 0.2s;
  }
  &:last-child {
    color: #146f8c;
  }
`;

export const rightIconContainer = styled.div`
  overflow: hidden;
  position: relative;
  width: 20px;
  height: 25px;
  margin-left: 5px;
`;

export const rightIcon = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  transform: rotate(45deg);
  right: 7px;
  border: 1px solid #ddd;
`;
