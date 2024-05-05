import ProtectedRoutes from "./Utils/ProtectedRoutes"
import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import _404 from "./Pages/_404"
import ForgotPassword from "./Pages/ForgotPassword"
import ForgotP_recovery from "./Pages/ForgotP_recovery"
import ChangePassword from "./Pages/ChangePassword"

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
      <h1>Todos</h1>
      <BrowserRouter>
            
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/forgotpassword' element={<ForgotPassword/>} />
              <Route path='/' element={<Register_Logout/>} />
              <Route path='/api/user/reset/:uid/:token' element={<ForgotP_recovery/>} />

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
