import ProtectedRoutes from "./Utils/ProtectedRoutes"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import _404 from "./Pages/_404"
import ForgotPassword from "./Pages/ForgotPassword"
import ForgotP_recovery from "./Pages/ForgotP_recovery"
import ChangePassword from "./Pages/ChangePassword"
import Email_verification from "./Pages/Email_verification"
import Landing from "./Pages/Landing"
import ViewPost from "./Pages/ViewPost"

import { BrowserRouter, Route, Routes,Navigate } from "react-router-dom"
function App() {
  function Logout() {
    localStorage.clear()
    return <Navigate to="/login" />
  }
  
  function Register_Logout() {
    localStorage.clear()
    return <Register />
  }
  return (
    <>
      <h1>Mini project</h1>
      <BrowserRouter>
            
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/view' element={<ViewPost />} />
              <Route path='/forgotpassword' element={<ForgotPassword/>} />
              <Route path='/' element={<Landing/>} />
              <Route path='/register' element={<Register_Logout/>} />
              <Route path='/api/user/reset/:uid/:token' element={<ForgotP_recovery/>} />
              <Route path='/api/user/verify/:uid/:token' element={<Email_verification/>} />

              <Route element={<ProtectedRoutes />}>
                <Route path='/home' element={<Home />} />
                <Route path='/changepassword' element={<ChangePassword />} />
              <Route path='/logout' element={<Logout />} />
              </Route>

              <Route path='*' element={<_404 />} />
            </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
