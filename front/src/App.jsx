import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import SignUp from './Pages/SignupForm.jsx'
import LoginForm from './Pages/LoginForm.jsx'
import OTPpage from './Pages/OtpPage.jsx'
import { Routes, Route } from 'react-router-dom';
import Category from './Pages/Category.jsx'
import PrivateRoute from './components/Core/PrivateRoute.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/otp" element={<OTPpage />} />
        <Route 
          path="/category" 
          element={
            <PrivateRoute>
              <Category />
            </PrivateRoute>
          } 
        />
      </Routes>
    </div>
  )
}

export default App
