import styled, { css, injectGlobal } from "styled-components"

export const Container = styled.span`
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: middle;
  border: 1px solid #eee;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  user-select: none;

  ${(props: any) => props.theme.disabled && `
    background-color: #eee;
    cursor: default;
  `}

  ${(props: any) => {
    switch (props.theme.size) {
      case "small":
        return `
          width: 30px;
          height: 15px;
          line-height: 15px;
          border-radius: 15px 15px;
        `
      case "normal":
        return `
          width: 44px;
          height: 22px;
          line-height: 20px;
          border-radius: 20px 20px;
        `
      case "large":
      default:
        return `
          width: 60px;
          height: 30px;
          line-height: 30px;
          border-radius: 30px 30px;
        `
    }
  }}

  ${(props: any) => {
    if (props.theme.checked) {
      switch (props.theme.type) {
        case "info":
          return `
          background-color: #23b7e5;
          border-color: #23b7e5;
        `
        case "success":
          return `
          background-color: #27c24c;
          border-color: #27c24c;
        `
        case "primary":
          return `
          background-color: #7266ba;
          border-color: #7266ba;
        `
        case "danger":
          return `
          background-color: #f05050;
          border-color: #f05050;
        `
        case "warning":
          return `
          background-color: #fad733;
          border-color: #fad733;
        `
        case "dark":
        default:
          return `
          background-color: #3a3f51;
          border-color: #3a3f51;
        `
      }
    }
  }}
`

export const Inner = styled.span`
  color: #fff;
  position: absolute;
  left: 0;
  &:after {
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    content: " ";
    cursor: pointer;
    transition: left 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  }

  ${(props: any) => props.theme.disabled && `
    &:after {
        background-color: #eee;
    }
  `}

  ${(props: any) => {
    switch (props.theme.size) {
      case "small":
        return `
         font-size: 10px;
          &:after {
              width: 12px;
              height: 12px;
              left: 0;
              top: 0;
          }
        `
      case "normal":
        return `
          font-size: 12px;
          &:after {
              width: 18px;
              height: 18px;
              left: 0;
              top: 1px;
          }
        `
      case "large":
      default:
        return `
          font-size: 10px;
          &:after {
              width: 26px;
              height: 26px;
              left: 0;
              top: 1px;
          }
        `
    }
  }}

  ${(props: any) => {
    if (props.theme.checked) {
      switch (props.theme.size) {
        case "small":
          return `
            &:after {
                left: 17px;
            }
        `
        case "normal":
          return `
            &:after {
                left: 25px;
            }
        `
        case "large":
        default:
          return `
            &:after {
                left: 33px;
            }
        `
      }
    }
  }}
`
