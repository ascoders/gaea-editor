import styled from "styled-components"

export const Container = styled.div`

`

export const Title = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;
  font-size: 14px;
  color: #666;
`

export const TitleCaret = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 5px;
  padding-left:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: #666;
  transition: all .2s;
  ${(props: any) => props.themes.down && `
    transform: rotate(90deg);
  `}
`

export const EmptyCaret = styled.div`
 width: 25px;
`

export const Children = styled.div`
  display: none;
  padding-left: 10px;
`
