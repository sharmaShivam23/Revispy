import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/common/Navbar';
import SignUp from './Pages/SignupForm.jsx';
import LoginForm from './Pages/LoginForm.jsx';
import OTPpage from './Pages/OtpPage.jsx';
import { Routes, Route } from 'react-router-dom';
import Category from './Pages/Category.jsx';
import PrivateRoute from './components/Core/PrivateRoute.jsx';
import SplashScreen from './components/common/Splash.jsx';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setLoading(false);
    }, 4000); 
    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
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
      )}
    </>
  );
}

export default App;
