import styled from 'styled-components';

export const Container = (styled.div as any).withConfig({ componentId: 'tree-container' })`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
