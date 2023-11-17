// Todo: AppLayout 수정 필요
import { useRef, useState, useEffect } from 'react'
import * as F from './userProfile.styled'
import Axios from 'axios'

const userProfile = ({ userID }) => {
  const [images, setImages] = useState('/logo.png')
  const [userId, setUserId] = useState('')

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [campus, setCampus] = useState('')
  const [major, setMajor] = useState('')
  const [rate, setRate] = useState(0)
  const [numEvaluators, setNumEvaluators] = useState(0)
  const [photo, setPhoto] = useState('/logo.png')
  const [description, setDescription] = useState('')

  const inputFile = useRef(null)

  useEffect(() => {
    setUserId(userID)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    document.cookie = `token=${token}`
    async function fn() {
      try {
        const data = { userName: userID }
        const response = await Axios.post(
          'http://localhost:8000/user/profile/',
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          },
        )

        const {
          data: {
            info: {
              userName,
              email,
              phone,
              major,
              rate,
              numEvaluators,
              campus,
              description,
              photo,
            },
          },
        } = response
        setUserName(userName)
        setEmail(email)
        setCampus(campus)
        setMajor(major)
        setPhone(phone)
        setRate(rate)
        setNumEvaluators(numEvaluators)
        setDescription(description)
        if (photo.length === 0) {
          setPhoto('/logo.png')
        } else {
          setPhoto(photo)
        }
      } catch (error) {}
    }
    fn()
  }, [userID])

  return (
    <F.AuthWrapper desc={`${userID}의 프로필`}>
      <F.verticalWrapper>
        <F.RoundedImageObject src={photo}></F.RoundedImageObject>
      </F.verticalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel label="ID" readonly="readonly" value={userName} />
        <F.InputWithLabel label="이메일" readonly="readonly" value={email} />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel label="캠퍼스" readonly="readonly" value={campus} />
        <F.InputWithLabel label="전공" readonly="readonly" value={major} />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel
          label="평점"
          readonly="readonly"
          value={`${rate}/(${numEvaluators}명)`}
        />
        <F.InputWithLabel label="전화번호" readonly="readonly" value={phone} />
      </F.horizontalWrapper>
      <F.TextAreaWithLabel
        label="자기소개"
        readonly="readonly"
        value={description}
      />
    </F.AuthWrapper>
  )
}

export default userProfile
