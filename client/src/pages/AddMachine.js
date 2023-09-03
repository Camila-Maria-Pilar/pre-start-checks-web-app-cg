import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import Button from '../components/Button';
import Card from '../components/Card';

const ADD_MACHINE = gql`
  mutation AddMachine($name: String!) {
    addMachine(name: $name) {
      id
    }
  }
`;

function AddMachine() {
  const [machineName, setMachineName] = useState('');
  const [addMachine] = useMutation(ADD_MACHINE);
  const [successMessage, setSuccessMessage] = useState('');

  const saveMachine = async () => {
    setSuccessMessage(''); // Clear previous success message
    try {
      if (!machineName) {
        setSuccessMessage("All fields are required."); // Display validation message
        return;
      }

      const { data, errors } = await addMachine({
        variables: {
          name: machineName,
        },
      });

      if (errors) {
        console.log('GraphQL Errors:', errors);
        return;
      }

      setMachineName(''); // Clear the input field
      setSuccessMessage("Machine has been saved successfully!"); // Set success message

    } catch (error) {
      console.error("Error while saving machine:", error);
    }
  };

  return (
    <div>
      <h1>Machines</h1>
      <div style={{ display: "flex", justifyContent: "flex-end", margin: "10px 0" }}>
        <Link to="/machines" style={{ textDecoration: 'none' }}>
          <button style={{ padding: '8px 12px', cursor: 'pointer' }}>Back to List</button>
        </Link>
      </div>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>} {/* Display success message if exists */}
      <Card title="Machine Details">
        <InputField
          label="Machine Name"
          name="machineName"
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
        />
      </Card>
      <Button label="Save" onClick={saveMachine}/>
    </div>
  );
}

export default AddMachine;
