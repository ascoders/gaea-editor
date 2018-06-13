import styled from 'styled-components';

export const Container = styled.div`
  ${(props: any) =>
    props.theme.active &&
    `
    background-color: white;
    box-shadow: inset 0 0 10px #cacaca;
    &:hover {
      background-color: white;
    }
  `};
`;
