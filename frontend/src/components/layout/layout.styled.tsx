import styled from 'styled-components'

export const TestBox = styled.div`
  background-color: ${(props) => (props.color ? 'blue' : 'red')};
  width: 100px;
`

// export const TestBox = styled.div`
//   font-size:
// `

export const TestButton = styled.div`
  font-size: 30px;
`

export const TopNavUL = styled.ul`
  display: flex;
`

export const TopNavLI = styled.li`
  margin-right: 21px;
  color: #67bde8;
  text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  font-family: Jua;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`

export const LogoImage = styled.img`
  cursor: pointer;
  width: 200px;
`
export const TopNav = styled.div``
