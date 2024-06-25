import React from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { useAuth } from '../components/authContext';
import Navbar from '../components/navBar';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      login(result.user);
      navigate('/'); // Redirect to home or another page after login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Login with Google</h2>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GoogleButton onClick={signInWithGoogle} />
      </div>
    </div>
  );
};

export default Login;
