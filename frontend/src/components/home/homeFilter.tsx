import { useEffect, useState } from 'react'
import * as HF from './homeFilter.styled'

const HomeFilter = () => {
  const onClickSearch = () => {
    alert('Comming Soon')
  }

  return (
    <HF.HomeFilterBox>
      <HF.LogoImg src="/logo.png" />
      <HF.FilterBox>
        <HF.SearchBox>
          <HF.Search />
          <HF.SearchIcon src="/assets/search.png" />
        </HF.SearchBox>
        <HF.SelectBox>
          <HF.SelectFilter />
          <HF.SelectFilter />
          <HF.SelectFilter />
        </HF.SelectBox>
      </HF.FilterBox>
      <HF.Others>
        <HF.IconImg src="/assets/favorite.png" />
        <HF.IconImg src="/assets/profile.png" />
      </HF.Others>
    </HF.HomeFilterBox>
  )
}

export default HomeFilter
