import styled from 'styled-components';

export const Container = (styled.div as any).withConfig({ componentId: 'tree-node-container' })`
  flex-grow: 1;
`;

export const Title = styled.div`
  cursor: pointer;
  display: flex;
  user-select: none;
  font-size: 14px;
  color: #666;
  flex-grow: 1;
  align-items: center;
`;

export const TitleCaret = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  padding-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #666;
  transition: all 0.2s;
  ${(props: any) =>
    props.theme.down &&
    `
    transform: rotate(90deg);
  `};
`;

export const EmptyCaret = styled.div`
  width: 25px;
`;

export const Children = (styled.div as any).withConfig({ componentId: 'childs-container' })`
  display: none;
  padding-left: 10px;
`;
