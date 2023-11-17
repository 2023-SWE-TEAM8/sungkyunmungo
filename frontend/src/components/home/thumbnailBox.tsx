/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import * as TB from './thumbnailBox.styled'

const ThumbnailBox = ({ te, num, title }) => {
  const [numIn, setNumIn] = useState(num)
  const [imgData, setImgData] = useState({
    success: true,
    data: [{ imageUrl: [], price: 0, description: '', status: false }],
  })

  const [favorite, setFavorite] = useState([])
  const [open, setOpen] = useState(false)

  const [targetCampus, setTargetCampus] = useState('')
  const [targetMajor, setTargetMajor] = useState('')

  const [targetName, setTargetName] = useState('')

  const router = useRouter()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [majorFilter, setMajorFilter] = useState([])
  const campusFilter = ['NSC', 'HSSC']
  const sellStatusFilter = ['판매중', '판매 완료']

  const addFilter = [...campusFilter, ...majorFilter]

  const onErrorImg = (e) => {
    e.target.src = '/assets/noImg.jpg'
  }

  useEffect(() => {
    ;(async () => {
      let tempData
      if (te == '1' || te == '3') {
        tempData = await (
          await fetch(`http://localhost:8000/board/posts?limit=${num}`)
        ).json()
      } else if (te == '2') {
        // favorite
        setFavorite([
          localStorage.getItem('fav_camp'),
          localStorage.getItem('fav_major'),
        ])

        tempData = await (
          await fetch(
            `http://localhost:8000/board/posts/search?searchTerm=&campus=${
              localStorage.getItem('fav_camp') == null
                ? ''
                : localStorage.getItem('fav_camp')
            }&status=&page=1&limit=${num}&condition=&major=${
              localStorage.getItem('fav_major') == null
                ? ''
                : localStorage.getItem('fav_major')
            }`,
          )
        ).json()
      }

      setImgData(tempData)

      const tempDataMajor = await (
        await fetch(`http://localhost:8000/board/majors`)
      ).json()

      setMajorFilter(tempDataMajor)
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      let tempData
      if (router.isReady) {
        if (te == '4') {
          tempData = await (
            await fetch(
              `http://localhost:8000/board/posts/search?searchTerm=${router.query.input}&campus=${router.query.campus}&status=${router.query.status}&page=1&limit=${num}&major=${router.query.major}`,
            )
          ).json()
        }
        setImgData(tempData)
      }
    })()
  }, [router.isReady, router.query])

  useEffect(() => {
    ;(async () => {
      // alert(te)
      let tempData
      if (te == '1' || te == '3') {
        tempData = await (
          await fetch(`http://localhost:8000/board/posts?limit=${numIn}`)
        ).json()
      } else if (te == '2') {
        // favorite
        tempData = await (
          await fetch(
            `http://localhost:8000/board/posts/search?searchTerm=&campus=${
              localStorage.getItem('fav_camp') == null
                ? ''
                : localStorage.getItem('fav_camp')
            }&status=&page=1&limit=${numIn}&condition=&major=${
              localStorage.getItem('fav_major') == null
                ? ''
                : localStorage.getItem('fav_major')
            }`,
          )
        ).json()
      } else if (te == '4') {
        // search
        tempData = await (
          await fetch(
            `http://localhost:8000/board/posts/search?searchTerm=${router.query.input}&campus=${router.query.campus}&status=${router.query.status}&page=1&limit=${numIn}&major=${router.query.major}`,
          )
        ).json()
      }
      setImgData(tempData)
    })()
  }, [numIn])

  useEffect(() => {
    // alert(`${te}favorite`)
    ;(async () => {
      let tempData
      if (router.isReady) {
        if (te == '2') {
          tempData = await (
            await fetch(
              `http://localhost:8000/board/posts/search?searchTerm=&campus=${
                localStorage.getItem('fav_camp') == null
                  ? ''
                  : localStorage.getItem('fav_camp')
              }&status=&page=1&limit=${num}&condition=&major=${
                localStorage.getItem('fav_major') == null
                  ? ''
                  : localStorage.getItem('fav_major')
              }`,
            )
          ).json()
        }
        setImgData(tempData)
      }
    })()
  }, [favorite])

  const moreOnclick = async () => {
    const updatedNumIn = parseInt(numIn, 10) + parseInt(num, 10)
    setNumIn(updatedNumIn)
  }

  const goPost = (postId, e) => {
    router.push(`/post/${postId}`)
  }

  const addFav = () => {
    if (campusFilter.includes(targetName)) {
      localStorage.setItem('fav_camp', targetName)
    } else if (majorFilter.includes(targetName)) {
      localStorage.setItem('fav_major', targetName)
    }

    setFavorite([
      localStorage.getItem('fav_camp'),
      localStorage.getItem('fav_major'),
    ])

    setOpen(false)
  }

  const DelFav = (targetEl) => {
    if (campusFilter.includes(targetEl)) {
      localStorage.removeItem('fav_camp')
    } else if (majorFilter.includes(targetEl)) {
      localStorage.removeItem('fav_major')
    }

    setFavorite([
      localStorage.getItem('fav_camp'),
      localStorage.getItem('fav_major'),
    ])
    alert('삭제 완료')
  }

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }

  const titleModal = {
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
  }

  return (
    <>
      <TB.TitleDiv>
        {title}
        {te == 2 ? (
          <>
            {favorite.map((el_fa) => {
              return el_fa == null ? (
                ''
              ) : (
                <TB.FavoriteDiv>
                  {el_fa}
                  <TB.DelFavorite onClick={(event) => DelFav(el_fa)}>
                    X
                  </TB.DelFavorite>
                </TB.FavoriteDiv>
              )
            })}
            <TB.FavoriteAdd onClick={handleOpen}>
              즐겨찾기 추가 +
            </TB.FavoriteAdd>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={titleModal}
                >
                  어떤 항목을 추가하시겠어요?
                </Typography>
                <TB.ModalDiv id="modal-modal-description" sx={{ mt: 2 }}>
                  <TB.SelectFilterModal
                    onChange={(e) => {
                      setTargetName(e.target.value)
                    }}
                  >
                    <option disabled hidden selected>
                      추가할 즐겨찾기
                    </option>
                    {addFilter.map((el) => {
                      return (
                        <option key={`${el}123`} value={el}>
                          {el}
                        </option>
                      )
                    })}
                  </TB.SelectFilterModal>
                  <TB.FavoriteAddModal onClick={(event) => addFav()}>
                    추가
                  </TB.FavoriteAddModal>
                </TB.ModalDiv>
              </Box>
            </Modal>
          </>
        ) : (
          ''
        )}
      </TB.TitleDiv>

      {imgData == undefined ? (
        <TB.TitleDiv> Loading </TB.TitleDiv>
      ) : imgData.message == undefined ? (
        <TB.ThumbnailBox>
          {imgData.data.map((el, index) => {
            return index == numIn - 1 ? (
              <TB.MoreButtonWrapper onClick={moreOnclick}>
                <TB.ThumbnailImg
                  src={el.imageUrl[0]}
                  key={el._id}
                  last={1}
                  onError={onErrorImg}
                />
                <TB.MoreButton>+ 더보기</TB.MoreButton>
              </TB.MoreButtonWrapper>
            ) : (
              <TB.ThumbnailImg
                src={el.imageUrl[0]}
                key={el._id}
                last={0}
                onClick={(event) => goPost(el._id, event)}
                onError={onErrorImg}
              />
            )
          })}
        </TB.ThumbnailBox>
      ) : (
        <TB.TitleDiv> 결과가 없습니다 </TB.TitleDiv>
      )}
    </>
  )
}

export default ThumbnailBox
