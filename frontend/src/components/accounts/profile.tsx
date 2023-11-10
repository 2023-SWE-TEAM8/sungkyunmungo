// Todo: AppLayout 수정 필요
import { useRef, useState } from 'react'
import * as F from './profile.styled.'

const myProfile = () => {
  const [images, setImages] = useState([]) // 이미지 배열로 변경
  const inputFile = useRef(null)

  const handleFileUpload = (e) => {
    const { files } = e.target
    if (files && files.length) {
      if (images.length >= 4) {
        alert('이미지는 네 장까지만 업로드 할 수 있습니다.')
      } else {
        setImages([...images, URL.createObjectURL(files[0])])
      }
    }
    console.log(images.length)
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
          src="/logo.png"
          onClick={test}
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
        {/* <F.SelectWithLabel
          label="상태 선택"
          options={[
            { value: '', label: '소프트웨어학' },
            { value: 'HCCS', label: '경영학' },
          ]}
        /> */}
      </F.horizontalWrapper>
      {/* <F.InputWithLabelWithButton
        label="사진 등록"
        btnLabel="사진 추가"
        onClick={onButtonClick}
        inputFile={inputFile}
        handleFileUpload={handleFileUpload}
      />
      <F.FigureBox>
        {images.map((image, index) => (
          <F.ImageObject src={image} />
        ))}
      </F.FigureBox> */}
      <F.TextAreaWithLabel label="지기소개" />
      <F.AuthButton>등록하기</F.AuthButton>
    </F.AuthWrapper>
  )
}

export default myProfile
