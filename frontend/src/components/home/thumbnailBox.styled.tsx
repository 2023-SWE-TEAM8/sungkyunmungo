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
  cursor: pointer;
`

export const TitleDiv = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 2vw;
  padding-right: 2vw;
  margin-top: 20px;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
`

export const FavoriteDiv = styled.div`
  font-size: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-left: 5px;
  background-color: #67bde8;
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

export const DelFavorite = styled.button`
  border: none;
  background-color: transparent;
  font-weight: bold;
  cursor: pointer;
`

export const FavoriteAdd = styled.button`
  font-size: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-left: 5px;
  border: none;
  font-weight: bold;
  background-color: #b8b8ff;
  cursor: pointer;
`

export const ModalDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SelectFilterModal = styled.select`
  width: 70%;
  margin: 10px;
  height: 35px;
  border-radius: 8px;
  padding: 10px;
  padding-right: 40px;
  filter: opacity(0.8);
  -o-appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-weight: bold;
  outline: none;
  background-image: url('/assets/select.png');
  background-repeat: no-repeat;
  background-position: 97% 50%;
  background-size: 25px;
`

export const FavoriteAddModal = styled.button`
  font-size: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-left: 5px;
  border: none;
  font-weight: bold;
  background-color: #b8b8ff;
  cursor: pointer;
`
