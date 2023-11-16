import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import * as TB from './thumbnailBox.styled'

const ThumbnailBox = ({ te, num, title }) => {
  const [numIn, setNumIn] = useState(num)
  const [imgData, setImgData] = useState({})
  const [favorite, setFavorite] = useState([])
  const [open, setOpen] = useState(false)

  const [targetName, setTargetName] = useState('')

  const router = useRouter()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const campusFilter = ['자연과학캠퍼스', '인문사회캠퍼스']
  const majorFilter = ['소프트웨어', '기계공학', '전기전자']
  const sellStatusFilter = ['판매중', '판매완료']

  const addFilter = [...campusFilter, ...majorFilter]

  useEffect(() => {
    ;(async () => {
      const data = await (
        await fetch(`https://picsum.photos/v2/list?page=${te}&limit=${num}`)
      ).json()
      setImgData(data)

      setFavorite(['전기전자', '소프트', '자연과학캠퍼스'])
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      const data = await (
        await fetch(`https://picsum.photos/v2/list?page=${te}&limit=${numIn}`)
      ).json()
      setImgData(data)
    })()
  }, [numIn])

  const moreOnclick = async () => {
    const updatedNumIn = parseInt(numIn, 10) + parseInt(num, 10)
    setNumIn(updatedNumIn)
  }

  const goPost = (postId, e) => {
    router.push(`/post/${postId}`)
  }

  const addFav = () => {
    alert(targetName)
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
              return (
                <TB.FavoriteDiv>
                  {el_fa}
                  <TB.DelFavorite>X</TB.DelFavorite>
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
      <TB.ThumbnailBox>
        {Object.values(imgData).map((el, index) => {
          return index == numIn - 1 ? (
            <TB.MoreButtonWrapper onClick={moreOnclick}>
              <TB.ThumbnailImg src={el.download_url} key={el.id} last={1} />
              <TB.MoreButton>+ 더보기</TB.MoreButton>
            </TB.MoreButtonWrapper>
          ) : (
            <TB.ThumbnailImg
              src={el.download_url}
              key={el.id}
              last={0}
              onClick={(event) => goPost(el.id, event)}
            />
          )
        })}
      </TB.ThumbnailBox>
    </>
  )
}

export default ThumbnailBox
