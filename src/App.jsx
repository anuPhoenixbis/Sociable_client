import './App.css'
import  HomePage from './pages/Home/HomePage'
import  LoginPage from './pages/Login/LoginPage'
import Register from './pages/Login/Register'
import  Navbar from './pages/Navbar/Navbar'
import  ProfilePage from './pages/Profile/ProfilePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthForm from './pages/Login/AuthForm' // path to the new wrapper
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'




function App() {
  // checking if auth or not via the jwt token
  const isAuth = Boolean(useSelector((state)=>state.token))//if the token exists then we are authorized and we can access the routes
  
  const router = createBrowserRouter([
    {
      path:'/',
      element:<AuthForm type="login">
                {(formikProps) => <LoginPage {...formikProps} />}
              </AuthForm>,
    },{
      path:'/home',
      element: isAuth ? (
        <HomePage/>
      ) : (
        <Navigate to='/' />
      )
    },{
      path:'/profile/:userId',
      element: isAuth ? (
        <ProfilePage/>
      ) : (
        <Navigate to='/' />
      )
    },{
      path:'/register',
      element: <AuthForm type="register">
                {(formikProps) => <Register {...formikProps} />}
              </AuthForm>,
    }
  ])
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
