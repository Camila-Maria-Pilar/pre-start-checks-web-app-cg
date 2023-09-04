import React from 'react';
import { useNavigate} from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect user to the login page 
    navigate('/login');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/applogo_notbg3.png" alt="App Logo" style={{ width: '200px' }} />
      <p>You have successfully logged out!</p>
      <button onClick={handleLogout}>Click here to log in again</button>
      
    </div>
  );
};

export default Logout;
