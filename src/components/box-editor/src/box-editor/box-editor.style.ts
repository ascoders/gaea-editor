import styled, { css } from 'styled-components';

const leftRightTopBottom = css`
  display: flex;
  position: absolute;
`;

const leftRight = css`
  flex-direction: row;
  cursor: ew-resize;
`;

const topBottom = css`
  flex-direction: column;
  cursor: ns-resize;
`;

export const Container = styled.div`
  position: relative;
`;

export const Left = styled.div`
  ${leftRightTopBottom} ${leftRight};
`;

export const Right = styled.div`
  ${leftRightTopBottom} ${leftRight};
`;

export const Top = styled.div`
  ${leftRightTopBottom} ${topBottom};
`;

export const Bottom = styled.div`
  ${leftRightTopBottom} ${topBottom};
`;

export const NumberBox = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  user-select: none;
`;

export const Input = styled.input`
  outline: none;
  width: calc(100% - 5px);
  height: calc(100% - 8px);
  text-align: center;
  border: none;
  background-color: transparent;
`;

export const ButtonContainer = styled.div`
  overflow: hidden;
`;

export const ButtonTriangle = styled.div`
  transition: all 0.2s;
  user-select: none;
  ${(props: any) => {
    switch (props.themes.position) {
      case 'left':
        return `
          border-right-color: #666;
          &:hover {
              border-right-color: black;
          }
        `;
      case 'top':
        return `
          border-bottom-color: #666;
          &:hover {
              border-bottom-color: black;
          }
        `;
      case 'right':
        return `
          border-left-color: #666;
          &:hover {
              border-left-color: black;
          }
        `;
      case 'bottom':
        return `
          border-top-color: #666;
          &:hover {
              border-top-color: black;
          }
        `;
    }
  }};
`;
