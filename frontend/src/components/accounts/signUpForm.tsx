// Todo: AppLayout 수정 필요
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Axios from 'axios'
import * as S from './loginForm.styled'
import * as F from './signUpForm.styled'

const signUpForm = () => {
  const router = useRouter()
  const [campus, setCampus] = useState('자연과학캠퍼스')
  const [major, setMajor] = useState('SW')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [checkEmailCode, setCheckEmailCode] = useState(false)

  const [username, setUsername] = useState('')
  const [checkUsername, setCheckUsername] = useState(false)
  const [password, setPassword] = useState('')

  const [name, setName] = useState('')
  const [checkName, setCheckName] = useState(false)
  const [studentId, setStudentId] = useState('')
  const [phone, setPhone] = useState('')

  const generalEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
  const skkuEmailRegex = /^[A-Za-z0-9._%+-]+@(skku\.edu|g\.skku\.edu)$/

  const handleSendEmailVerificationCode = () => {
    // Todo: 일단은 모든 메일에 대해 인증코드를 발송할 수 있는 상태임.

    if (!generalEmailRegex.test(email)) {
      alert('이메일 형식을 지켜주세요')
    } else if (!skkuEmailRegex.test(email)) {
      alert(
        '성균관대 재학생만 이용 가능합니다. \nskku.edu 혹은 g.skku.edu 도메인 이메일을 사용하세요.',
      )
    } else {
      async function fn() {
        const data = { email }
        try {
          alert('잠시만 기다려주세요!')
          await Axios.post('http://localhost:8000/user/mail/', data)
          alert('인증코드가 발송되었습니다.')
        } catch (error) {
          alert('에러 발생')
        }
      }
      fn()
    }
  }

  const handleCheckUsername = () => {
    async function fn() {
      const data = { userName: username }
      try {
        alert('잠시만 기다려주세요!')
        const response = await Axios.post(
          'http://localhost:8000/user/username/',
          data,
        )
        if (response.data.message === '사용 가능한 아이디 입니다.') {
          alert('사용 가능한 아이디입니다.')
          setCheckUsername(true)
        } else {
          alert('중복된 아이디입니다.')
        }
      } catch (error) {
        alert('에러 발생, 잠시 후 다시 시도해주세요.')
      }
    }

    if (username.length > 4) {
      fn()
    } else {
      alert('아이디는 4자 이상입니다.')
    }
  }

  const handleCheckName = () => {
    async function fn() {
      const data = { name }
      try {
        alert('잠시만 기다려주세요!')
        const response = await Axios.post(
          'http://localhost:8000/user/name/',
          data,
        )
        if (response.data.message === '사용 가능한 닉네임 입니다.') {
          alert(response.data.message)
          setCheckName(true)
        } else {
          alert('중복된 닉네임입니다.')
        }
      } catch (error) {
        alert('에러 발생, 잠시 후 다시 시도해주세요.')
      }
    }
    if (name.length > 4) {
      fn()
    } else {
      alert('닉네임은 4자 이상입니다.')
    }
  }

  const handleCheckCode = () => {
    async function fn() {
      const data = { code, email }
      try {
        alert('잠시만 기다려주세요!')
        const response = await Axios.post(
          'http://localhost:8000/user/code/',
          data,
        )
        if (response.data.message === '인증 완료') {
          setCheckEmailCode(true)
          alert('인증되었습니다.')
        } else {
          alert('중복된 닉네임입니다.')
        }
      } catch (error) {
        alert('에러 발생, 잠시 후 다시 시도해주세요.')
      }
    }
    fn()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'username') {
      setUsername(value)
    } else if (name === 'name') {
      setName(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'campus') {
      setCampus(value)
    } else if (name === 'major') {
      setMajor(value)
    } else if (name === 'code') {
      setCode(value)
    } else if (name === 'studentId') {
      setStudentId(value)
    } else if (name === 'phone') {
      setPhone(value)
    }
  }

  const handleSubmit = () => {
    async function fn() {
      const data = {
        userName: username,
        name,
        passWord: password,
        phone,
        email,
        studentId,
        major,
        campus,
      }
      try {
        alert('잠시만 기다려주세요!')
        const response = await Axios.post(
          'http://localhost:8000/user/join/',
          data,
        )
        alert('회원가입 성공!')
        router.push('/accounts/login')
      } catch (error) {
        alert('에러 발생, 잠시 후 다시 시도해주세요.')
        alert(error)
      }
    }
    if (checkEmailCode && checkName && checkUsername) {
      fn()
    } else {
      alert('인증과정을 모두 거쳐야합니다.')
    }
  }

  return (
    <F.AuthWrapper desc="성균문고 서비스 이용을 위한 회원가입을 해주세요.">
      <F.SelectWithLabel
        type="select"
        label="캠퍼스 선택"
        name="campus"
        onChange={handleChange}
        options={[
          { value: '자연과학캠퍼스', label: '자연과학캠퍼스(수원)' },
          { value: '인문사회과학캠퍼스', label: '인문사회캠퍼스(서울)' },
        ]}
      />
      <F.SelectWithLabel
        type="select"
        label="전공 선택"
        options={[
          { value: 'SW', label: '소프트웨어학' },
          { value: 'BS', label: '경영학' },
        ]}
      />
      <F.InputWithLabelWithButton
        label="이메일 입력"
        btnLabel="인증번호 발송"
        onChange={handleChange}
        onClick={handleSendEmailVerificationCode}
        type="email"
        name="email"
      />
      <F.InputWithLabelWithButton
        label="이메일 인증번호 입력"
        btnLabel="인증하기"
        onChange={handleChange}
        onClick={handleCheckCode}
        type="text"
        name="code"
      />
      <F.InputWithLabelWithButton
        label="ID 입력"
        btnLabel="중복확인"
        onClick={handleCheckUsername}
        onChange={handleChange}
        type="text"
        name="username"
      />
      <F.InputWithLabel
        label="학번 입력"
        onChange={handleChange}
        name="studentId"
      />
      <F.InputWithLabel
        label="전화번호 입력"
        onChange={handleChange}
        type="text"
        name="phone"
      />
      <F.InputWithLabel
        label="비밀번호 입력"
        type="password"
        name="password"
        onChange={handleChange}
      />
      <F.InputWithLabelWithButton
        label="닉네임 입력"
        btnLabel="중복확인"
        onClick={handleCheckName}
        onChange={handleChange}
        type="text"
        name="name"
      />
      <F.AuthButton id="signup_btn" onClick={handleSubmit}>
        회원가입
      </F.AuthButton>
    </F.AuthWrapper>
  )
}

export default signUpForm
