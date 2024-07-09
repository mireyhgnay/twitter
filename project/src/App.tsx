import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import Loading from './components/loading';
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import styled from 'styled-components';
import ProtectedRoute from './components/protected-route';

const router = createBrowserRouter([
  {
    path: '/',
    element: 
      <ProtectedRoute>
        {/* Home, Profile 페이지에는 Layout이 공통으로 있는 것 */}
        <Layout /> 
      </ProtectedRoute>,
    children: [
      // Home, Profile Component는 Layout Component 내부에서 render 된다.
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]  
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreateAccount />,
  },
])

const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    background-color: black;
    color:white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  const [isLoading, setISLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady();
    setISLoading(false);
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <Wrapper>
      <GlobalStyles />
      {/* RouterProvider로 우리가 만든 router를 전달한다. */}
      {isLoading ? <Loading /> : <RouterProvider router={router} /> }
    </Wrapper>
  )
}

export default App;
