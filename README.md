#  이세영
### 원본코드 : https://github.com/easysIT/nwitter


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