import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isValid, setIsValid] = useState(false); // Validation status
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_MUTATION);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Basic email and password validation
    if (formState.email && formState.password) {
      setIsValid(true);

      try {
        const { data } = await loginUser({ variables: formState });
        localStorage.setItem('token', data.login.token);
        navigate('/dashboard');
      } catch (e) {
        setError('Failed to login');
        setIsValid(false);
      }
    } else {
      setError('Please fill in all fields');
      setIsValid(false);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <img src="/applogo_notbg3.png" alt="App Logo" style={{ width: '200px' }} />
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        <input
          placeholder="Your password"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
      
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
};

export default Login;
