import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
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

 
  const saveMachine = async () => {
    try {
      if (!machineName) {
        console.log("All fields are required.");
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
  
      const machineId = data.addMachine.id;
      // Now you can use machineId for further operations if needed
      
    } catch (error) {
      console.error("Error while saving machine:", error);
    }
  };
  
  
  
  return (
    <div>
      <h1>Machines</h1>

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



