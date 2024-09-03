import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { styled } from 'styled-components';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTwweForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [tweet, setTweet] = useState('');
  const [file, setFile] = useState<File | null>(null); // Type은 file 형태 아니면 Null의 형태이다.

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweet(e.target.value);
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // 이미지 한개만 등록하도록 하기
    if (files && files.length === 1) {
      setFile(files[0]);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (isLoading || !user || tweet === '' || tweet.length > 180) return;

    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(new Date().getTime() + offset);
    const createDate = koreaNow.toISOString().replace('T', ' ').split('.')[0];

    try {
      setIsLoading(true);
      const doc = await addDoc(collection(db, 'tweet'), {
        // firebaseDB - tweet컬렉션
        // 자바스크립트 코드로 추가하고 싶은 문서 추가
        tweet,
        createDate,
        username: user.displayName || 'Anonymous', // 익명이 경우에는 Anonymous
        userId: user.uid,
      });

      if (file) {
        // 1. 파일 저장할 위치 설정 (명확하게 경로 설정)
        const locationRef = ref(
          storage,
          `tweet/${user.uid}-${user.displayName}/${doc.id}`
        );
        // 2. 파일을 어디에 저장할지 설정 - locationRef 경로에 file을 저장한다.
        const result = await uploadBytes(locationRef, file);
        // 3. url string을 반환한다.
        const url = await getDownloadURL(result.ref);
        // doc업데이트
        await updateDoc(doc, {
          imgUrl: url,
        });
      }
      setTweet('');
      setFile(null);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <TextArea
        required
        rows={5}
        maxLength={180}
        placeholder='내용을 적어주세요'
        value={tweet}
        onChange={onChange}
      />
      <AttachFileButton htmlFor='file'>
        {file ? '이미지 추가 완료 ✅' : '이미지 추가하기'}
      </AttachFileButton>
      <AttachFileInput
        type='file'
        id='file'
        accept='image/*'
        onChange={onFileChange}
      />
      <SubmitBtn type='submit' value={isLoading ? '올리는 중...' : '올리기'} />
    </Form>
  );
}
