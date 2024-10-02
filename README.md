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

![프로필1.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/686f533d-fa18-4922-8836-b39ce4e40318/%ED%94%84%EB%A1%9C%ED%95%841.png)

![프로필2.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/e8a17940-c891-48f2-8498-ed964f7a343f/%ED%94%84%EB%A1%9C%ED%95%842.png)

- 회원가입 시 사용자가 입력한 정보를 서버에 업데이트, 이후 서버에서 사용자 정보를 받아옴
- 서버에서 받은 사용자 정보를 react-bootstrap 의 Card 컴포넌트를 이용하여 화면에 보여줌
- 개인정보 페이지에서 개인정보 생성 여부에 따라 개인정보 ‘생성하기’ 혹은 ‘업데이트’ 버튼이 변경됨

회원가입 페이지

![인증완료.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/e2a26abc-bd99-4ea2-9e26-0cbeab4bf618/%EC%9D%B8%EC%A6%9D%EC%99%84%EB%A3%8C.png)

![가입완료.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/34232bcf-418b-45e8-999b-8ed751cf011d/%EA%B0%80%EC%9E%85%EC%99%84%EB%A3%8C.png)

- react-hook-form 과 react-query 를 이용하여 사용자 입력값을 서버로 전달
- 회원가입 시 이메일 인증 후 성공시 다음단계 진행 가능

![인증.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/9b7d54b5-3e8b-4f1e-a7b2-eeab4294f211/%EC%9D%B8%EC%A6%9D.png)

![약관.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/8df1c033-10df-41f8-8cde-75214c3903fc/%EC%95%BD%EA%B4%80.png)

- 인증메일 발송 로딩시간에 isLoading 기능으로 로딩 페이지 구현하여 사용자 경험 
향상

- 회원가입 이후 약관 필수항목 제외 
선택항목 동의여부 수정 가능

개인정보입력 페이지

![개정전.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/bbe4db0e-b1dc-48a5-a230-3fd72caa2a1f/%EA%B0%9C%EC%A0%95%EC%A0%84.png)

![개정완.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/3e25344b-115e-49a2-bc98-3b94cdef87bf/%EA%B0%9C%EC%A0%95%EC%99%84.png)

- 개인정보 입력 전에 placeholder 표시, 이후 사용자가 데이터를 입력한 후엔 서버에서 받아온
    
    사용자 입력값을 표시
    

시퀀스 다이어그램

![시퀀스1.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/a405efdb-91c4-4ad4-bc35-b60a8cef87f2/%EC%8B%9C%ED%80%80%EC%8A%A41.png)

![시퀀스2.PNG](https://prod-files-secure.s3.us-west-2.amazonaws.com/715e52aa-3cbf-4c9b-bb35-e80f884012a0/5ef69323-e852-4493-b790-90341b2cf361/%EC%8B%9C%ED%80%80%EC%8A%A42.png)

- react-query 의 useQuery, useMutation 등의 커스텀 훅을 활용하여 서버 데이터의 패칭, 캐싱, 동기화 및 상태 관리를 효율적으로 수행


## 트러블 슈팅

개인정보 생성 시 발생하는 서버에러 수정

입력한 출생정보가 제대로 불러와지지 않는 오류 수정

- 유저가 입력한 정보를 바로 birth 로 받지 않고, birthDate 로 받아서 birth 로 보냄
