import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
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
  const navigate = useNavigate();
  const [loginUser] = useMutation(LOGIN_MUTATION);

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

 

// Submit form
const handleFormSubmit = async (event) => {
  event.preventDefault();
  try {
    const { data } = await loginUser({ variables: formState });
    localStorage.setItem('token', data.login.token);
    navigate('/dashboard');
  } catch (e) {
    setError('Failed to login');
  }
};

  return (
    <div>
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
      {error && <div>{error}</div>}
      
    </div>
  );
};

export default Login;
