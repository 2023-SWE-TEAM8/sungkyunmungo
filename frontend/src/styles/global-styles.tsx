import reset from 'styled-reset'
import { createGlobalStyle } from 'styled-components'

const styled = { createGlobalStyle }

const GlobalStyle = styled.createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }

  body {
    font-size: 20px;
    font-family: 'Jua';
  }

  @media only screen and (max-width: 768px) {
    body {
    }
  }

  .app {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'header header header'
      'contents contents contents'
      'footer footer footer';
    gap: 1rem;
    width: 100%;
    max-width: 100%;

    .header {
      display: flex;
      grid-area: header;
      justify-content: space-between;
      align-items: center;
      padding: 10px 5px;
      background-color: rgba(103, 189, 232, 0.1);
      padding: 20px;
    }

    .contents {
      grid-area: contents;
    }

    .footer {
      grid-area: footer;
      justify-self: center;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      background-color: blue;
    }
  }
`

export default GlobalStyle
