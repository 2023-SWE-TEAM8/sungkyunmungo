import styled from 'styled-components'

export const HomeFilterBox = styled.div`
  display: flex;
  width: 100%;
  height: 130px;
  justify-content: space-around;
  align-items: center;
`

export const LogoImg = styled.img`
  width: 25%;
  max-width: 250px;
  object-fit: scale-down;
`

export const FilterBox = styled.form`
  width: 65%;
  background-color: #67bde8;
  padding: 10px;
`

export const SearchBox = styled.div`
  display: flex;
  position: relative;
  height: 45px;
`

export const SearchIcon = styled.button`
  width: 40px;
  height: 30px;
  position: absolute;
  bottom: 50%;
  right: 10px;
  transform: translateY(50%);
  background-image: url('/assets/search.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
`

export const Search = styled.input`
  width: 100%;
  font-size: 1.5rem;
  outline: none;
  border-radius: 8px;
  padding: 10px;
`

export const SelectBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SelectFilter = styled.select`
  width: 30%;
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

export const Others = styled.div`
  display: flex;
  justify-content: space-between;
  width: 10%;
  max-width: 100px;
`

export const IconImg = styled.img`
  width: 40%;
  cursor: pointer;
`
