import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "../components/Card";

export const QUERY_ALLUSERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      username
      email
      role
      createdAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(_id: $id)
  }
`;

function ListUsers() {
  const { loading, error, data, refetch } = useQuery(QUERY_ALLUSERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const users = data?.getAllUsers || [];

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      refetch();  // Refresh the list after deletion
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>List of Users</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/addUser" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Add User</button>
        </Link>
      </div>
      {users.map((user, index) => (
        <div key={index}>
          <Card title={`User - ${user.username}`}>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/users/${user.id}`}>
                
              </Link>
              <button onClick={() => handleDeleteUser(user.id)}>x</button>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ListUsers;
