import { useEffect, useState } from 'react'
import * as TB from './thumbnailBox.styled'

const ThumbnailBox = ({ te, num, title }) => {
  const [imgData, setImgData] = useState({})

  // Do not use this fetch code yet, this will be update
  useEffect(() => {
    ;(async () => {
      const data = await (
        await fetch(`https://picsum.photos/v2/list?page=${te}&limit=${num}`)
      ).json()
      setImgData(data)
    })()
  }, [])

  // useEffect(() => {
  //   console.log(Object.keys(imgData))
  // }, [imgData])

  return (
    <>
      <TB.TitleDiv>{title}</TB.TitleDiv>
      <TB.ThumbnailBox>
        {Object.values(imgData).map((el, index) => {
          return index == num - 1 ? (
            <TB.MoreButtonWrapper>
              <TB.ThumbnailImg src={el.download_url} key={el.id} last />
              <TB.MoreButton>+ 더보기</TB.MoreButton>
            </TB.MoreButtonWrapper>
          ) : (
            <TB.ThumbnailImg src={el.download_url} key={el.id} last={false} />
          )
        })}
      </TB.ThumbnailBox>
    </>
  )
}

export default ThumbnailBox
