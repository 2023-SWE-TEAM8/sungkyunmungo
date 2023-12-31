import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import * as HF from './homeFilter.styled'

const HomeFilter = () => {
  const router = useRouter()

  const [searchInput, setSearchInput] = useState('')

  const [campusSelect, setCampusSelected] = useState('')
  const [majorSelect, setMajorSelected] = useState('')
  const [statusSelect, setStatusSelected] = useState('')

  const [majorFilter, setMajorFilter] = useState([])

  const onClickSearch = (event) => {
    // alert(
    //   `/search?` +
    //     `input=${searchInput}&campus=${campusSelect}&major=${majorSelect}&status=${statusSelect}`,
    // )
    event.preventDefault()

    router.push(
      `/search?` +
        `input=${searchInput}&campus=${campusSelect}&major=${majorSelect}&status=${statusSelect}`,
    )
  }

  const campusFilter = ['NSC', 'HSSC']
  const sellStatusFilter = ['판매중', '판매완료']

  useEffect(() => {
    ;(async () => {
      const tempData = await (
        await fetch(`http://localhost:8000/board/majors`)
      ).json()

      setMajorFilter(tempData)
    })()
  }, [])

  return (
    <>
      <HF.HomeFilterBox>
        <HF.LogoImg
          src="/logo.png"
          onClick={(event) => (router.asPath != '/' ? router.push('/') : '')}
        />
        <HF.FilterBox onSubmit={onClickSearch}>
          <HF.SearchBox>
            <HF.Search
              placeholder="구매할 책을 검색하세요!"
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
              }}
            />
            <HF.SearchIcon type="submit" />
          </HF.SearchBox>
          <HF.SelectBox>
            <HF.SelectFilter
              name="campus"
              onChange={(e) => {
                setCampusSelected(e.target.value)
              }}
            >
              <option disabled hidden selected>
                캠퍼스 필터
              </option>
              {campusFilter.map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                )
              })}
            </HF.SelectFilter>
            <HF.SelectFilter
              name="major"
              onChange={(e) => {
                setMajorSelected(e.target.value)
              }}
            >
              <option disabled hidden selected>
                전공 필터
              </option>
              {majorFilter.map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                )
              })}
            </HF.SelectFilter>
            <HF.SelectFilter
              name="status"
              onChange={(e) => {
                setStatusSelected(e.target.value)
              }}
            >
              <option disabled hidden selected>
                판매상태 필터
              </option>
              {sellStatusFilter.map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                )
              })}
            </HF.SelectFilter>
          </HF.SelectBox>
        </HF.FilterBox>
        <HF.Others>
          {/* <HF.IconImg src="/assets/favorite.png" /> */}
          <HF.IconImg
            src="/assets/profile.png"
            onClick={() => {
              // after session check
              router.push('/accounts/profile')
            }}
          />
        </HF.Others>
      </HF.HomeFilterBox>
      <HF.PostBox>
        <HF.PostTile>판매하실 전공서적이 있으신가요?</HF.PostTile>
        <HF.PostButton onClick={(event) => router.push('/posts/new')}>
          판매 등록
        </HF.PostButton>
      </HF.PostBox>
    </>
  )
}

export default HomeFilter
