import styled, { createGlobalStyle } from 'styled-components';

// tslint:disable-next-line:no-unused-expression
export const GlobalStyle = createGlobalStyle`
  .gaea-container {
    border: 1px dotted #ccc;
  }

  .gaea-draggable {

  }

  .gaea-highlight {
    outline-offset: -1px !important;
    outline: 1px solid #75b1ff !important;
  }

  .main-tool-editor-type-color {
    .ant-tooltip-inner {
      background-color: transparent;
      box-shadow: none;
    }
    .ant-tooltip-arrow {
      display: none;
    }
  }
`;

export const Container = styled.div`
  padding: 5px 0 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
  margin-right: 35px;
`;

export const ColorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  &:hover {
    border-color: #ccc;
  }
`;

export const ColorBox = styled.div`
  width: 15px;
  height: 14px;
  border-radius: 3px;
  border: 1px solid #eee;
`;
