import React from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import Card from "../components/Card";


const LIST_MACHINE = gql`
  query GetAllMachines {
    getAllMachines {
      id
      name
    }
  }
`;

const DELETE_MACHINE = gql`
  mutation DeleteMachine($id: ID!) {
    deleteMachine(_id: $id)
  }
`;

function ListMachine() {
  const { loading, error, data, refetch } = useQuery(LIST_MACHINE);
  const [deleteMachine] = useMutation(DELETE_MACHINE);
  const machines = data?.getAllMachines || [];

  const handleDeleteMachine = async (id) => {
    try {
      await deleteMachine({ variables: { id } });
      refetch();  // Refresh the list after deletion
    } catch (err) {
      console.error("Failed to delete machine:", err);
    }
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>List of Machines</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/addMachine" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Add Machine</button>
        </Link>
      </div>
      {machines.map((m, index) => (
        <div key={index}>
          <Card title="Machine Details">
            <p>{m.name}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Link to={`/machines/${m.id}`}>
              <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Details</button>
              </Link>
              <button onClick={() => handleDeleteMachine(m.id)}>x</button>
              
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default ListMachine;


