import styled from 'styled-components'

export const TestBox = styled.div`
  background-color: ${(props) => (props.color ? 'blue' : 'red')};
  width: 100px;
`

export const TestButton = styled.div`
  font-size: 30px;
`
