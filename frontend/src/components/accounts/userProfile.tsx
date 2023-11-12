// Todo: AppLayout 수정 필요
import { useRef, useState } from 'react'
import * as F from './userProfile.styled'

const userProfile = ({ userID }) => {
  const [images, setImages] = useState('/logo.png')
  const inputFile = useRef(null)

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

  const test = () => {
    alert('A!')
  }

  return (
    <F.AuthWrapper desc={`${userID}의 프로필`}>
      <F.verticalWrapper>
        <F.RoundedImageObject src={images}></F.RoundedImageObject>
      </F.verticalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel label="ID" readonly="readonly" />
        <F.InputWithLabel label="이메일" readonly="readonly" />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel label="캠퍼스" readonly="readonly" />
        <F.InputWithLabel label="전공" readonly="readonly" />
      </F.horizontalWrapper>
      <F.TextAreaWithLabel label="지기소개" readonly="readonly" />
    </F.AuthWrapper>
  )
}

export default userProfile
