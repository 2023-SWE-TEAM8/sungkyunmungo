// Todo: AppLayout 수정 필요
import { useRef, useState } from 'react'
import * as F from './profile.styled.'

const myProfile = () => {
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
    <F.AuthWrapper desc="내 프로필 보기">
      <F.verticalWrapper>
        <p>ID 및 이메일은 수정할 수 없습니다.</p>
        <F.RoundedImageObject
          src={images}
          onClick={onButtonClick}
          inputFile={inputFile}
          handleFileUpload={handleFileUpload}
        ></F.RoundedImageObject>
      </F.verticalWrapper>
      <F.horizontalWrapper>
        <F.InputWithLabel label="ID" readonly="readonly" />
        <F.InputWithLabel label="이메일" readonly="readonly" />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.SelectWithLabel
          label="캠퍼스 선택"
          options={[
            { value: '', label: '소프트웨어학' },
            { value: 'HCCS', label: '경영학' },
          ]}
        />
        <F.SelectWithLabel
          label="전공 선택"
          options={[
            { value: '', label: '소프트웨어학' },
            { value: 'HCCS', label: '경영학' },
          ]}
        />
      </F.horizontalWrapper>
      <F.TextAreaWithLabel label="지기소개" />
      <F.AuthButton>등록하기</F.AuthButton>
    </F.AuthWrapper>
  )
}

export default myProfile
