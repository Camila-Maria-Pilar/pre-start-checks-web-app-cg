import React from "react";
import { useQuery, gql } from "@apollo/client";

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

function ListMachine() {
  //   const [machineName, setMachineName] = useState('');
  const { loading, error, data } = useQuery(LIST_MACHINE);
  const machines = data?.getAllMachines || [];

  console.log("MACHINESSSSSSSSS", machines);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return machines.map((m, index) => (
    <div key={index}>
      <h1>Machines</h1>

      <Card title="Machine Details">{m.name}</Card>

      <Link to={`/machines${m.id}`}>View</Link>
    </div>
  ));
}

export default ListMachine;
