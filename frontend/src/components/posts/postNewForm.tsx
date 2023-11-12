// Todo: AppLayout 수정 필요
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import * as S from './loginForm.styled'
// import * as F from './signUpForm.styled'
// import * as F from '../accounts/signUpForm.styled'
import { useRef, useState } from 'react'
import * as F from './postNewForm.styled'

const postNewForm = () => {
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

  return (
    <F.AuthWrapper desc="판매글 작성">
      <F.InputWithLabel label="글 제목" />
      <F.horizontalWrapper>
        <F.InputWithLabel label="가격" />
        <F.InputWithLabel label="거래 방식" />
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
        <F.SelectWithLabel
          label="상태 선택"
          options={[
            { value: '', label: '소프트웨어학' },
            { value: 'HCCS', label: '경영학' },
          ]}
        />
      </F.horizontalWrapper>
      <F.InputWithLabelWithButton
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
      </F.FigureBox>
      <F.TextAreaWithLabel label="글 본문" />
      <F.AuthButton>등록하기</F.AuthButton>
    </F.AuthWrapper>
  )
}

export default postNewForm
