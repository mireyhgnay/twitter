import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbwZHpML06AOASrraE4grhdBQDgleoUF8",
  authDomain: "twitter-6b3c9.firebaseapp.com",
  projectId: "twitter-6b3c9",
  storageBucket: "twitter-6b3c9.appspot.com",
  messagingSenderId: "1071943198885",
  appId: "1:1071943198885:web:459d264e56df2c1a60454c"
};

// 위 config 옵션들을 통해서 app을 생성
const app = initializeApp(firebaseConfig);

// 위 app에 대한 인증 서비스를 사용한다!
export const auth = getAuth(app);