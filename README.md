#  이세영
### 원본코드 : https://github.com/easysIT/nwitter

### [06.07]
<details>
<summary>트윗 추가 기능 구현 2</summary>

```
1. uuid 라이브러리 추가
    - npm install uuid
    - 이미지 저장 시 고유 아이디로 저장하여 겹치지 않도록 하기 위함, 사용자의 uid/uuid 로 생성된 고유 번호로 스토리지에 저장
2. firebase 규칙 및 색인 설정
    - storage 규칙 수정 -> allow read, write: if request.auth != null; 해당 코드로 수정
    - firestore 색인 수정 -> nweets ( creatorId ASC , createdAt ASC , 쿼리범위 : 컬렉션)
3. 기타 사항
    - 교제의 내용은 firebase v8 로 진행되어 현재 설치되어있는 패키지 버전과 호환이 잘 안되는 부분이 있음
    - firebase doc 참조하여 v9 에서 권장하는 코드로 fbase.js , home.js 등등 firebase를 사용하는 부분 수정
```
</details>

### [05.25]
<details>
<summary>트윗 추가 기능 구현</summary>

```
1. 수정 기능 구현
2. 사진 미리보기 기능 구현
3. 웹 브라우저에 사진 출력
4. 파일 선택 및 취소 버튼 생성

```
</details>

### [05.18]
<details>
<summary>firebase 연동 (이어서)</summary>

```
1. 트윗 사용자 인덱스 관리 
    - 수정, 삭제 등의 관리 기능을 위한 고유 인식값 필요 -> createId 로 설정
2. 실시간 DB로 리스트 보여주기
    - 게시물 업로드시 새로고침을 해야만 화면상에 반영됨
    - 처음 화면을 렌더링 할때만 get 함수로 파이어스토어의 데이터를 받아옴 -> get 을 onSnapshot 으로 변경
3. 컴포넌트 분리
4. 트윗 수정, 삭제 기능 추가
```
</details>

### [05.11]
<details>
<summary>firebase DB 생성 및 연동 </summary>

```
1. React -> firebase 연결
    fbase.js 파일에 코드 추가
    import "firebase/firestore";
    export const dbService = firebase.firestore();
2. firebase 에 데이터 저장
    - dbService.collection("nweets") 컬렉션 생성
    - add({ text:nweet, createAt:Date.now()}) == 문서 생성
    - setNweet("") == 문자열 초기화
    - firebase 콘솔에서 저장된 값 확인
3. firebase 에서 데이터 조회 (SELECT)
    - get 함수를 이용하여 nweet 컬렉션(테이블)과 데이터를 불러옴 
        => 데이터에 개수만큼 불러옴 (List 혹은 foreach 사용할것)
4. 조회된 데이터로 리스트 생성
5. 트윗 아이디 저장

```
</details>

### [05.04]
<details>
<summary>Navigation, Log Out 구현, firebase DB 생성</summary>

```
- firebase 콘솔 : 

- fibase.js : firebaseInstance 추가
- Auth.js : firebaseInstance 추가, onSocialClick 메소드 구현
- Navigation.js : 파일 생성  
- Router.js : import Navigation , Redirect 설정 추가 (주석 처리됨)
- Profile.js : Log Out 버튼 추가, history 변수 추가

```

</details>

### [04.27]
<details>
<summary>Sign in, Sign up 구현</summary>

```
- 로그인 기능을 위한 코드 수정
    1. Auth.js - 회원가입 , 로그인 폼 및 메소드 작성
    2. App.js - 로그인이 성공한 경우 Home 으로 이동시킴. 

- firebase 에 로그인, 회원가입이 반영되는지 확인
    1. firebase 콘솔에 접속 -> Authentication -> Users 에서 확인할 수 있음.

```

</details>

### [04.13]
<details>
<summary>firebase 설정</summary>

```
- firebase 설정 변경
    1. firebase 콘솔에 접속 Authentication 
    2. 로그인 제공업체 추가 (이메일/비밀번호 , Google, GitHub)
    3. GitHub 추가시 : GitHub 접속 > Settings > Developer settings > OAuth Apps > 새로운 앱 추가

- firebase API 키 인증 에러 발견 
    - Uncaught FirebaseError: Firebase: Error (auth/invalid-api-key). 
    - 해당 에러는 API 키를 제대로 들어가지 않는 상태라 발생한 에러
    - .env , firebase version , 각 js 파일 이상 없음
    - 해결 방법 : .env 가 작동을 안하고 있는것 같아서 dotenv 라이브러리 추가
    - 명령어 : npm i dotenv --save

- Auth.js 코드 추가 : 로그인 및 회원가입 기능 추가
```

</details>

### [04.06]
<details>
<summary>Router 설정 및 firebase.js 수정</summary>

```
- firebase.js 수정 // fbase.js 으로 파일명 변경 및 코드 수정 
    < firebase 버전 에러시 참고 >
    //to use firebase app
    import firebase from 'firebase/app'; //older version
    import firebase from 'firebase/compat/app'; //v9

    //to use auth
    import 'firebase/auth'; //older version
    import 'firebase/compat/auth'; //v9

    //to use firestore
    import 'firebase/firestore'; //Older Version
    import 'firebase/compat/firestore'; //v9

- jsconfig.json 추가 // 절대경로 지정을 위한 설정파일
- App.js 코드 수정 // useState 사용
- npm i react-router-dom@5.2.0 // 버전 수정
- Router.js 코드 추가 (로그인 상태 변수로 Auth, Home 분기점 추가)
```
</details>

### [03.30]
<details>
<summary>Firebase 프로젝트 생성 및 설정</summary>

- firebase 사이트 
1. 프로젝트 이름 : nwitter /
2. 생성 시 google analytics 해제
3. 웹앱 선택

- firebase 설치 (안되는 경우에는 cli 가 관리자 권한인지 확인)
```
npm install firebase
```

- src/firebase.js 생성 후 붙여넣기
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

...

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```

- firebase Import 시키기
index.js
```
[Firebase 8버전 이하]
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

[Firebase 9버전 이하]
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
```

- env 파일 환경 변수 (비밀키) 설정
1.  ~/.env 생성
2. firebase.js -> Config 내용 삽입
```
REACT_APP_API_KEY = ... 
REACT_APP_AUTH_DOMAIN = ... 
REACT_APP_PROJECT_ID = ...
REACT_APP_STORAGE_BUCKET = ... 
REACT_APP_MESSAGING_SENDER_ID = ... 
REACT_APP_APP_ID = ...
```
- gitignore에 .env 추가

- firebase.js에서 firebaseConfig의 value 값 env으로 변경
```
  apiKey: process.env.REACT_APP_API_KEY,
  ...
```

- src/routes 폴더 생성
```
Auth / EditProfile / Home / Profile JS 파일 생성
각 파일에 아래 내용 추가

const 파일명 = () => <span>파일명</span>

export default 파일명
```
- src/components 폴더 생성
App.js 파일 이동


- components/Router.js 생성
```
import { HashRouter as Router, Route, Swich } from "react-router-dom";

const AppRouter = () => {
    return (
        <Router>
            <Swich>
                <Route />
            </Swich>
        </Router>
    )
}

export default AppRouter
```

</details>

### [03.23]
<details>
<summary>nwitter 프로젝트 생성</summary>

npx create-react-app 프로젝트명

Git 명령어
```
- git init // .git 파일 생성
- git remote origin add [주소] // github 레포지토리와 연동
- git add . // 작업한 파일 추가
- git commit -m "커밋 메세지" // commit 진행
- git push origin master // 푸시 진행
```

<details>
<summary>파일 수정</summary>

- package.json
- index.js
- App.js 
</details>

<details>
<summary>파일 삭제</summary>

App.css / App.test.js / index.css / logo.svg / reportWebVitals.js / setupTest.js 
</details>
<details>