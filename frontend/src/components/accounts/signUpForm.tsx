// Todo: AppLayout 수정 필요
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import * as S from './loginForm.styled'
import * as F from './signUpForm.styled'

const signUpForm = () => {
  const [campus, setCampus] = useState('')
  const [major, setMajor] = useState('')
  const [email, setEmail] = useState('')

  const generalEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  const skkuEmailRegex = /^[A-Za-z0-9._%+-]+@(skku\.edu|g\.skku\.edu)$/

  const handleSendEmailVerificationCode = () => {
    if (!generalEmailRegex.test(email)) {
      alert('이메일 형식을 지켜주세요')
    } else if (!emailRegex.test(email)) {
      alert(
        '성균관대 재학생만 이용 가능합니다. \nskku.edu 혹은 g.skku.edu 도메인 이메일을 사용하세요.',
      )
    } else {
      alert('Welcome to SKKU')
    }
  }

  const handleCheckID = () => {}
  const handleCheckUsername = () => {}

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    }
  }

  const handleSubmit = () => {}

  return (
    <F.AuthWrapper desc="성균문고 서비스 이용을 위한 회원가입을 해주세요.">
      <F.SelectWithLabel
        type="select"
        label="캠퍼스 선택"
        options={[
          { value: 'NCS', label: '자연과학캠퍼스(수원)' },
          { value: 'HCCS', label: '인문사회캠퍼스(서울)' },
        ]}
      ></F.SelectWithLabel>
      <F.SelectWithLabel
        type="select"
        label="전공 선택"
        options={[
          { value: '', label: '소프트웨어학' },
          { value: 'HCCS', label: '경영학' },
        ]}
      ></F.SelectWithLabel>
      <F.InputWithLabelWithButton
        label="이메일 입력"
        btnLabel="인증번호 발송"
        onChange={handleChange}
        onClick={handleSendEmailVerificationCode}
        type="email"
        name="email"
      ></F.InputWithLabelWithButton>
      <F.InputWithLabel
        label="이메일 인증번호 입력"
        type="text"
        name="code"
      ></F.InputWithLabel>
      <F.InputWithLabelWithButton
        label="ID 입력"
        btnLabel="중복확인"
        onClick={handleCheckID}
        type="text"
        name="id"
      ></F.InputWithLabelWithButton>
      <F.InputWithLabel
        label="비밀번호 입력"
        type="password"
        name="password"
      ></F.InputWithLabel>
      <F.InputWithLabel
        label="비밀번호 확인"
        type="password"
        name="check_password"
      ></F.InputWithLabel>
      <F.InputWithLabelWithButton
        label="닉네임 입력"
        btnLabel="중복확인"
        onClick={handleCheckUsername}
        type="text"
        name="username"
      ></F.InputWithLabelWithButton>
      <F.TextAreaWithLabel
        label="자기소개 작성"
        type="password"
        name="personal_description"
      ></F.TextAreaWithLabel>
      <F.AuthButton id="signup_btn">회원가입</F.AuthButton>
    </F.AuthWrapper>
  )
}

export default signUpForm
