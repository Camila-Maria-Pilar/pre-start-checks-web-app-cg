import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      
      
    }
  }
`;

export const QUERY_MACHINE = gql`
  query getAllMachines {
    machines {
      _id
      name
      createdAt
    }
  }
`;

export const QUERY_SINGLE_MACHINE = gql`
  query getMachine($MachineId: ID!) {
    machine(MachineId: $machineId) {
      _id
      name      
      createdAt
      
  }
  }
`;

