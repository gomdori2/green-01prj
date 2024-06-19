### 1차 그린 프로젝트

**식물 일정 관리앱**

## 소개

1차 그린 프로젝트는 사용자가 식물의 관리 일정을 쉽게 추적하고 관리할 수 있도록 돕는 앱입니다. 현재는 기본적인 기능만 구현되어 있으며, 이후 추가 기능 및 디자인 개선이 예정되어 있습니다.

## 주요 기능

- 로그인
  - contextApi로 전역상태를 관리
  - 세션을 활용
- 회원가입

  - 메일 인증
  - 회원가입

- 식물 등록
  - 식물공공데이터를 받아와 식물 등록
  - 각 식물
    - 등록 / 조회 / 수정 / 삭제 가능
- 캘린더

  - 각 관리상태를 아이콘으로 관리
  - 캘린더를 활용하여 원하는 관리일자에 일정 등록
  - 일정
    - 등록 / 조회 / 수정 / 삭제 가능

- 커뮤니티
  - 게시글
    - 등록 / 조회 / 수정 / 삭제 가능
  - 좋아요 / 댓글 구현
    - 등록 / 조회 / 수정 / 삭제 가능

## 설치 및 실행

1. **프로젝트 클론**

```txt
git clone https://github.com/gomdori2/green-01prj.git
```

1. **의존성 설치**

```txt
npm install
```

1. 개발 서버 실행

```txt
npm start
```

## 사용 기술

- **Frontend**: React,
- 기본 웹 기술
  - HTML
  - CSS
  - JavaScript
- 스타일링

  - emotion
  - scss
  - restCss

- 형상 관리도구

  - gitHub

- 개발 도구

  - esLint
  - prettier

- 라이브러리
  - react
  - react-router
  - axios
  - react-icons
  - react-calendar
  - moment
  - react-toastify
  - react-paginate

**저작권자 표시**: 이미지 저작권자 표시는 현재 상태에서 팝업으로 변경할 예정입니다.

- **파비콘**: 다음과 같은 링크의 아이콘으로 변경할 예정입니다.

## 저작권 및 참고 자료

- **404Page 이미지**:
  - <a href="https://kr.freepik.com/author/ntl-studio">ntl-studio: 404Page.jpg</a>
- **파비콘 이미지**:
  - <a href="https://www.flaticon.com/kr/free-icons/" title="화분 아이콘">화분 아이콘 제작자: DinosoftLabs - Flaticon</a>
