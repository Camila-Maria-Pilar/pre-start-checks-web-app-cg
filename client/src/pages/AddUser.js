import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
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
  const [role, setRole] = useState('');  // Initializing with an empty string
  const [addUser] = useMutation(ADD_USER);

  const saveUser = async () => {
    try {
      if (!username || !email || !password || !role) {
        console.log("All fields are required.");
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

      const userId = data.addUser.id;
      // Now you can use userId for further operations if needed
      
    } catch (error) {
      console.error("Error while saving user:", error);
    }
  };

  return (
    <div>
      <h1>Add User</h1>

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
