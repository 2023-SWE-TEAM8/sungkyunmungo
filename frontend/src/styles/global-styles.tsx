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
  }

  @media only screen and (max-width: 768px) {
    body {
      background-color: red;
    }
  }

  @media only screen and (max-width: 576px) {
    body {
      background-color: blue;
    }
  }
`

export default GlobalStyle
