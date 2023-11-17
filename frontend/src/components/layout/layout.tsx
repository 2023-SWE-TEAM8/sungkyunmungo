import { useRouter } from 'next/router'
import * as S from './layout.styled'

// Todo: AppLayout 수정 필요
const layout = ({ children, homeNum }) => {
  const router = useRouter()
  return (
    <div className="app">
      <div className="header">
        {homeNum ? (
          <div />
        ) : (
          <S.LogoImage
            src="/logo.png"
            alt="SKMG"
            onClick={(event) => router.push('/')}
          />
        )}

        <S.TopNav>
          <S.TopNavUL>
            <S.TopNavLI onClick={(event) => router.push('/accounts/signup')}>
              회원가입
            </S.TopNavLI>
            <S.TopNavLI onClick={(event) => router.push('/accounts/login')}>
              로그인
            </S.TopNavLI>
            <S.TopNavLI>고객센터</S.TopNavLI>
          </S.TopNavUL>
        </S.TopNav>
      </div>
      <div className="contents">{children}</div>
      <div className="footer">&copy; 2023 SWE TEAM8</div>
    </div>
  )
}

export default layout
