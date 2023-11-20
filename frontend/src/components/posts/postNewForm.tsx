// Todo: AppLayout 수정 필요
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/navigation'
// import * as S from './loginForm.styled'
// import * as F from './signUpForm.styled'
// import * as F from '../accounts/signUpForm.styled'
import Axios from 'axios'
import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import AWS from 'aws-sdk'
import * as F from './postNewForm.styled'

const postNewForm = () => {
  const [images, setImages] = useState([]) // 이미지 배열로 변경
  const inputFile = useRef(null)
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [price, setPrice] = useState(0)
  const [campus, setCampus] = useState('NSC')
  const [major, setMajor] = useState('software')
  const [description, setDescription] = useState('')
  const [condition, setCondition] = useState('상')

  const handleFileUpload = async (e) => {
    const { files } = e.target
    alert(files[0].name)
    const S3_BUCKET = 'skmg-bucket'
    const REGION = 'ap-northeast-2'

    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    })

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    })

    const params = {
      Bucket: S3_BUCKET,
      Key: files[0].name,
      Body: files[0],
    }

    const upload = s3
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        // File uploading progress
        console.log(`Uploading ${parseInt((evt.loaded * 100) / evt.total)}%`)
      })
      .promise()

    if (files && files.length) {
      if (images.length >= 4) {
        alert('이미지는 네 장까지만 업로드 할 수 있습니다.')
      } else {
        await upload.then((err, data) => {
          console.log(err)
          const fileUrl = `https://skmg-bucket.s3.ap-northeast-2.amazonaws.com/${files[0].name}`
          setImages([...images, fileUrl])
        })
      }
    }
  }

  const onButtonClick = () => {
    inputFile.current.click()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'title') {
      setTitle(value)
    } else if (name === 'price') {
      setPrice(value)
    } else if (name === 'campus') {
      setCampus(value)
    } else if (name === 'major') {
      setMajor(value)
    } else if (name === 'condition') {
      setCondition(value)
    } else if (name === 'description') {
      setDescription(value)
    }
  }

  const handleSubmit = () => {
    async function fn() {
      const writer = localStorage.getItem('userID')

      if (
        title === '' ||
        price === 0 ||
        description === '' ||
        images.length === 0
      ) {
        alert('에러 발생, 잠시 후 다시 시도해주세요.')
      } else {
        const data = {
          writer,
          title,
          price,
          description,
          imageUrl: images,
          campus,
          major,
          condition,
        }
        try {
          const response = await Axios.post(
            'http://localhost:8000/board/posts/write/',
            data,
          )
          alert(response.data.message)
          router.push('/')
        } catch (error) {
          alert('에러 발생, 잠시 후 다시 시도해주세요.')
        }
      }
    }
    fn()
  }
  return (
    <F.AuthWrapper desc="판매글 작성">
      <F.horizontalWrapper>
        <F.InputWithLabel
          label="글 제목"
          onChange={handleChange}
          name="title"
        />
        <F.InputWithLabel label="가격" name="price" onChange={handleChange} />
      </F.horizontalWrapper>
      <F.horizontalWrapper>
        <F.SelectWithLabel
          label="캠퍼스 선택"
          options={[
            { value: 'NSC', label: '자과캠' },
            { value: 'HSCC', label: '인문캠' },
          ]}
          onChange={handleChange}
          name="campus"
        />
        <F.SelectWithLabel
          label="전공 선택"
          options={[
            { value: 'software', label: '소프트웨어학' },
            { value: 'statistics', label: '경영학' },
          ]}
          onChange={handleChange}
          name="major"
        />
        <F.SelectWithLabel
          label="상태 선택"
          options={[
            { value: '상', label: '상' },
            { value: '중', label: '중' },
            { value: '하', label: '하' },
          ]}
          onChange={handleChange}
          name="condition"
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
      <F.TextAreaWithLabel
        label="글 본문"
        name="description"
        onChange={handleChange}
      />
      <F.AuthButton onClick={handleSubmit}>등록하기</F.AuthButton>
    </F.AuthWrapper>
  )
}

export default postNewForm
