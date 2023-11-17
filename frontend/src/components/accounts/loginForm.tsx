// Todo: AppLayout 수정 필요
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useRouter } from 'next/navigation'
import * as S from './loginForm.styled'

const loginForm = () => {
  const router = useRouter()
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'id') {
      setId(value)
    } else {
      setPassword(value)
    }
  }

  const handleLogin = (e) => {
    async function fn() {
      const data = { userName: id, passWord: password }
      try {
        alert('잠시만 기다려주세요!')
        const response = await Axios.post(
          'http://localhost:8000/user/login/',
          data,
        )
        const {
          data: { token },
        } = response

        localStorage.setItem('jwtToken', token)
        localStorage.setItem('userID', id)
        router.push('/')
      } catch (error) {
        alert('에러 발생, 잠시 후 다시 시도해주세요.')
      }
    }
    fn()
  }

  return (
    <S.AuthWrapper desc="성균문고 서비스 이용을 위해 로그인을 해주세요.">
      <S.InputWithLabel
        label="ID"
        name="id"
        onChange={handleChange}
      ></S.InputWithLabel>
      <S.InputWithLabel
        label="PASSWORD"
        type="password"
        name="password"
        onChange={handleChange}
      ></S.InputWithLabel>
      <S.RightAlignedLink onClick={() => router.push('/accounts/find')}>
        아이디/비밀번호 찾기
      </S.RightAlignedLink>
      <S.AuthButton id="login_btn" onClick={handleLogin}>
        로그인
      </S.AuthButton>
    </S.AuthWrapper>
  )
}

export default loginForm
