import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

import Divider from '@mui/material/Divider'
import Switch from '@mui/material/Switch'

import axios from 'axios'
import * as DP from './detailPost.styled'

const DetailedPost = ({ curUser, descData }) => {
  const [checked, setChecked] = useState()
  const router = useRouter()
  const isInitialMount = useRef(true)

  const style = {
    borderColor: '#a8a8a8',
    width: '95%',
    marginLeft: '0',
  }

  const getDateDiff = (d1, d2) => {
    const date1 = new Date(d1)
    const date2 = new Date(d2)

    const diffDate = date1.getTime() - date2.getTime()

    return Math.abs(diffDate / (1000 * 60 * 60 * 24))
  }

  useEffect(() => {
    if (descData.status != '') {
      setChecked(descData.status == '판매중')
    }
  }, [descData.status])

  useEffect(() => {
    ;(async () => {
      if (descData.status != undefined) {
        if (checked != undefined) {
          const url = 'http://localhost:8000/board/posts/status'
          // 추가된 부분
          const axiosConfig = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }

          const sendParam = {
            _id: router.query.id,
            status: checked ? '판매중' : '판매완료',
          }

          await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendParam),
          })
        }
      }
    })()
  }, [checked])

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <DP.DescBox>
      <DP.TitleBox>
        <DP.ProfileBox>
          <DP.ProfileImgae src="/assets/profile.png" />
          <DP.ProfileTextBox>
            <DP.ProfileText>{descData.writer}</DP.ProfileText>
            <DP.ProfileText>{descData.campus}</DP.ProfileText>
          </DP.ProfileTextBox>
        </DP.ProfileBox>

        {curUser == descData.writer ? (
          <DP.curUserToggle>
            {checked ? '판매중' : '판매완료'}
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </DP.curUserToggle>
        ) : (
          <DP.SendButton>
            {checked ? '메시지 보내기' : '판매완료'}
          </DP.SendButton>
        )}
      </DP.TitleBox>
      <Divider sx={style} />

      <DP.DescTitleBox>
        <DP.DescTitle>{descData.title}</DP.DescTitle>
        <DP.DescStatus>상태 : {descData.condition}</DP.DescStatus>
      </DP.DescTitleBox>

      <DP.DescSmall>
        {descData.major} ㆍ
        {getDateDiff(descData.createdDt, new Date()) < 1
          ? '오늘'
          : `${Math.floor(getDateDiff(descData.createdDt, new Date()))} 일전`}
      </DP.DescSmall>
      <DP.DescPrice>{`${descData.price.toLocaleString()} 원`}</DP.DescPrice>

      <DP.DescNormal>
        {descData.description.split('\n').map(function (item, idx) {
          return (
            <DP.DescSpan key={idx}>
              {item}
              <br />
            </DP.DescSpan>
          )
        })}
      </DP.DescNormal>
    </DP.DescBox>
  )
}

export default DetailedPost
