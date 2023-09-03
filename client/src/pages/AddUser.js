import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';

const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $role: String!) {
    addUser(username: $username, email: $email, password: $password, role: $role) {
      id
    }
  }
`;

function AddUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [addUser] = useMutation(ADD_USER);

  const saveUser = async () => {
    setSuccessMessage(''); // Clear previous success message
    try {
      if (!username || !email || !password || !role) {
        setSuccessMessage("All fields are required."); // Display validation message
        return;
      }
      
      const { data, errors } = await addUser({
        variables: {
          username,
          email,
          password,
          role,
        },
      });
      
      if (errors) {
        console.log('GraphQL Errors:', errors);
        return;
      }

      setUsername(''); // Clear the username field
      setEmail(''); // Clear the email field
      setPassword(''); // Clear the password field
      setRole(''); // Clear the role dropdown
      setSuccessMessage("User has been saved successfully!"); // Set success message
      
    } catch (error) {
      console.error("Error while saving user:", error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/listUsers" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Back to List</button>
        </Link>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message if exists */}
      <Card title="User Details">
        <InputField
          label="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {/* Role dropdown */}
        <label htmlFor="role">Role:</label>
        <select
          name="role"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">-- Select Role --</option>
          <option value="Admin">Admin</option>
          <option value="Operator">Operator</option>
        </select>
      </Card>

      <Button label="Save" onClick={saveUser} />
    </div>
  );
}

export default AddUser;
