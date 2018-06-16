import styled, { injectGlobal } from 'styled-components';

export const injectGlob = () => injectGlobal`
  .gaea-container {
    border: 1px dotted #ccc;
  }

  .gaea-draggable {

  }

  .gaea-highlight {
    outline-offset: -1px !important;
    outline: 1px solid #75b1ff !important;
  }
`;
