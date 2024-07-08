import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./routes/create-account";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Home, Profile 페이지에는 Layout이 공통으로 있는 것
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

function App() {
  return (
    <>
      <GlobalStyles />
      {/* RouterProvider로 우리가 만든 router를 전달한다. */}
      <RouterProvider router={router} />
    </>
  )
}

export default App;
