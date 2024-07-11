// 로그인 성공한 사용자는 해당 페이지를 볼 수 있다.
// 로그인하지 않은 경우, 로그인페이지로 리다이렉트 되도록한다.
// 계정이 없는 사람이 못들어가도록 Home, Profile 페이지를 보호하는 것이다.

import { Navigate } from 'react-router-dom';
import { auth } from '../firebase';

export default function ProtectedRoute({ 
  children 
}: {
  children: React.ReactNode
}) {
  const user = auth.currentUser;
  // 사용자 정보에 없다면 login페이지로 리다이렉트
  if(user === null) {
    return<Navigate to="/login" />;
  }

  // <Home /> or <Profile />
  return children;
}