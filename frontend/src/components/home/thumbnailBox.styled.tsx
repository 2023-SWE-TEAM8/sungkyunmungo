import styled from 'styled-components'

export const ThumbnailBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  place-items: center;
  justify-content: space-around;
  width: 100%;
  grid-row-gap: 40px;
`

export const ThumbnailImg = styled.img`
  width: 15vw;
  height: 15vw;
  object-fit: cover;
  border-radius: 10px;
  filter: opacity(${(props) => (props.last ? '35%' : '100%')});
`

export const TitleDiv = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 20px;
  margin-bottom: 20px;
`

export const MoreButtonWrapper = styled.div`
  position: relative;
  background-color: #ece7e7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

export const MoreButton = styled.div`
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: bold;
  width: 10vw;
`
