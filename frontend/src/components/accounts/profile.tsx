// Todo: AppLayout 수정 필요
import { use, useEffect, useRef, useState } from 'react'
import * as F from './profile.styled'
import Axios from 'axios'

const myProfile = () => {
  const [images, setImages] = useState('/logo.png')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [phone, setPhone] = useState('')
  const [campus, setCampus] = useState('')
  const [major, setMajor] = useState('')
  const [rate, setRate] = useState(0)
  const [numEvaluators, setNumEvaluators] = useState(0)
  const inputFile = useRef(null)

  useEffect(() => {
    const token = localStorage.getItem('jwtToken')
    document.cookie = `token=${token}`
    async function fn() {
      try {
        const response = await Axios.get(
          'http://localhost:8000/user/profile/',
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
            },
          },
        } = response
        setEmail(email)
        setUsername(userName)
        setCampus(campus)
        setMajor(major)
        setPhone(phone)
        setRate(rate)
        setNumEvaluators(numEvaluators)
      } catch (error) {
        alert(error)
      }
    }
    fn()
  }, [])

  const handleFileUpload = (e) => {
    const { files } = e.target
    if (files && files.length) {
      setImages(URL.createObjectURL(files[0]))
      alert(images)
    }
  }

  const onButtonClick = () => {
    inputFile.current.click()
  }

  const handleSubmit = () => {
    const token = localStorage.getItem('jwtToken')
    document.cookie = `token=${token}`
    async function fn() {
      try {
        const response = await Axios.patch(
          'http://localhost:8000/user/profile/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
              major,
              campus,
            },
            withCredentials: true,
          },
        )
      } catch (error) {
        alert(error)
      }
    }
    fn()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'phone') {
      setPhone(value)
    } else if (name === 'major') {
      setMajor(value)
    } else if (name === 'campus') {
      setCampus(value)
    }
  }

  return (
    <F.AuthWrapper desc="내 프로필 보기">
      <F.verticalWrapper>
        <p>ID 및 이메일은 수정할 수 없습니다.</p>
        <F.RoundedImageObject
          src={images}
          onClick={onButtonClick}
          inputFile={inputFile}
          handleFileUpload={handleFileUpload}
        />
      </F.verticalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel
          label="ID"
          name="username"
          value={username}
          readonly="readonly"
        />
        <F.InputWithLabel
          label="이메일"
          name="email"
          value={email}
          readonly="readonly"
        />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel
          label="나의 평점"
          readonly="readonly"
          value={`${rate}/(${numEvaluators}명)`}
        />
        <F.InputWithLabel
          label="전화 번호"
          name="phone"
          value={phone}
          onChange={handleChange}
        />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.SelectWithLabel
          label="캠퍼스 선택"
          options={[
            { value: '자연과학캠퍼스', label: '자연과학캠퍼스' },
            { value: '인문사회캠퍼스', label: '인문사회캠퍼스' },
          ]}
          value={campus}
          name="campus"
          onChange={handleChange}
        />
        <F.SelectWithLabel
          label="전공 선택"
          options={[
            { value: 'SW', label: '소프트웨어학' },
            { value: 'ST', label: '경영학' },
          ]}
          value={major}
          name="major"
          onChange={handleChange}
        />
      </F.horizontalWrapper>
      <F.TextAreaWithLabel label="자기소개" />
      <F.AuthButton onClick={handleSubmit}>등록하기</F.AuthButton>
    </F.AuthWrapper>
  )
}

export default myProfile
