import * as S from './layout.styled'

// Todo: AppLayout 수정 필요
const layout = ({ color, children }) => {
  return (
    <div className="app">
      <div className="header">
        <S.LogoImage src="/logo.png" alt="SKMG"></S.LogoImage>
        <S.TopNav>
          <S.TopNavUL>
            <S.TopNavLI>회원가입</S.TopNavLI>
            <S.TopNavLI>로그인</S.TopNavLI>
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
