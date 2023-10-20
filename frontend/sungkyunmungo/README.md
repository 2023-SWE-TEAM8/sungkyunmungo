This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## 프로젝트 실행

Development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 프로젝트 관련설정 및 주의점

1. Eslint , Prettier 설정이 되어 있으니 관련 개인 설정 필요
2. npm 대신 Yarn 사용 두개를 혼용해서 사용하지 말 것
3. 최신 Next 버전에서 바벨 파서를 이용할 시 문제(swc 사용불가)의 문제가 있어 타입스크립트 파서를 쓰기 위해 tsx파일 형식으로 지정(단 타입스크립트 문법이 아니더라도 사용가능하게 설정)
4. 추가적인 타입스크립트 관련 오류 발생시 tsconfig.json 파일 참고하여 설정

## 파일 형식 및 구조

1. src 폴더 내부에 components 폴더에 관련 컴포넌트 제작
2. src 폴더 내부에 pages 폴더에 각 페이지 별 index view 제작
3. 컴포넌트 혹은 페이지에 적용되는 scss 파일은 관련 코드와 같은 폴더에 name.styled.tsx 의 형식을 지켜 파일이름을 제작
4. 전역적으로 적용해야 하는 스타일은 src 폴더 내부의 styles 폴더 global-styles.tsx 파일에 추가
5. styled-component를 사용하여 스타일 파일을 제작할 것

