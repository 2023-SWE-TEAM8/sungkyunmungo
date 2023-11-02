// Todo: AppLayout 수정 필요
import { useEffect, useState } from 'react'
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
    // Todo: 로그인 API 통신
    function callAPIForLogin() {
      if (true) {
        alert(`ID is ${id} PW is ${password}`)
        // router.push('/')
      } else {
        alert('Failed to login!')
      }
      setId('')
      setPassword('')
    }

    callAPIForLogin()
  }

  return (
    <S.AuthWrapper desc="성균문고 서비스 이용을 위해 로그인을 해주세요.">
      <S.InputWithLabel
        label="ID"
        name="id"
        onChange={handleChange}
        value={id}
      ></S.InputWithLabel>
      <S.InputWithLabel
        label="PASSWORD"
        type="password"
        name="password"
        value={password}
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
