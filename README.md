# 우리집 (house)

오늘의 집 사이트를 모방하여 만든 우리집 사이트




## 프로젝트 기간

 2024.06 ~ 현재 진행중

| 테스트계정 |  |
| --- | --- |
| 아이디 | hakjoon55@gmail.com |
| 비밀번호 | qwe123!@# |

## 기술스택

React, javascript(es6), react-bootstrap, styled-components,react-query, React-hook-form


## 주요 기능

프로필 페이지

![프로필1](https://github.com/user-attachments/assets/789bacdc-d587-400c-a418-4d328b5fdb8a)

![프로필2](https://github.com/user-attachments/assets/09a6c52f-a798-4f98-b652-362750fde174)

- 회원가입 시 사용자가 입력한 정보를 서버에 업데이트, 이후 서버에서 사용자 정보를 받아옴
- 서버에서 받은 사용자 정보를 react-bootstrap 의 Card 컴포넌트를 이용하여 화면에 보여줌
- 개인정보 페이지에서 개인정보 생성 여부에 따라 개인정보 ‘생성하기’ 혹은 ‘업데이트’ 버튼이 변경됨

회원가입 페이지

![인증완료](https://github.com/user-attachments/assets/8d4ca2f5-fb3c-4dc9-b1f5-056398519a72)

![가입완료](https://github.com/user-attachments/assets/e9fe2800-9a44-4bf2-9251-f4c573a4023a)

- react-hook-form 과 react-query 를 이용하여 사용자 입력값을 서버로 전달
- 회원가입 시 이메일 인증 후 성공시 다음단계 진행 가능

![인증](https://github.com/user-attachments/assets/98e67ac9-b434-4542-8233-99e4a3a962da)

![약관](https://github.com/user-attachments/assets/478bcb65-4999-4cfb-a4bd-8cef0bd5a1f4)

- 인증메일 발송 로딩시간에 isLoading 기능으로 로딩 페이지 구현하여 사용자 경험 
향상

- 회원가입 이후 약관 필수항목 제외 
선택항목 동의여부 수정 가능


개인정보입력 페이지

![개정전](https://github.com/user-attachments/assets/b023ea59-69aa-4fc9-bb8c-e0908b5e18eb)

![개정완](https://github.com/user-attachments/assets/90404971-7836-4d85-ad7c-488b0dfe83bb)

- 개인정보 입력 전에 placeholder 표시, 이후 사용자가 데이터를 입력한 후엔 서버에서 받아온
    
    사용자 입력값을 표시
    

시퀀스 다이어그램

![시퀀스1 PNG](https://github.com/user-attachments/assets/56d09a51-0cd9-4e96-886f-af292d6be886)

![시퀀스2 PNG](https://github.com/user-attachments/assets/2d659aad-4bc4-446c-a643-ffd3598eff4d)

- react-query 의 useQuery, useMutation 등의 커스텀 훅을 활용하여 서버 데이터의 패칭, 캐싱, 동기화 및 상태 관리를 효율적으로 수행


## 트러블 슈팅

개인정보 생성 시 발생하는 서버에러 수정

입력한 출생정보가 제대로 불러와지지 않는 오류 수정

- 유저가 입력한 정보를 바로 birth 로 받지 않고, birthDate 로 받아서 birth 로 보냄
