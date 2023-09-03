import { gql } from "@apollo/client";

export const QUERY_ALLUSERS = gql`
  query GetAllUsers {
  getAllUsers {
    id
    username
    email
    role
    
  }
}
`;

export const QUERY_USER = gql`
  query GetUser($getUserId: ID!) {
  getUser(id: $getUserId) {
    id
    username
    email
    password
    role
    
  }
}
  `;

export const QUERY_ALLMACHINES = gql`
  query GetAllMachines {
    getAllMachines {
      name
      
    }
  }`;

export const QUERY_MACHINE = gql`
  query GetMachine($getMachineId: ID!) {
  getMachine(id: $getMachineId) {
    name
    
  }
}`;

export const GET_QUESTIONS_BY_MACHINE_ID = gql`
  query GetQuestionsByMachineId($machineId: ID!) {
  getQuestionsByMachineId(machineId: $machineId) {
    id
    machineId
    questions {
      id
      text
      answers
    }
    createdAt
  }
}`;

export const GET_ALLQUESTIONS = gql`
  query GetQuestionsByMachineId($machineId: ID!) {
  getQuestionsByMachineId(machineId: $machineId) {
    
    machineId
    questions {
      text
      answers
    }
    
  }

}`;

export const GET_QUESTION = gql`
  query GetQuestion($getQuestionId: ID!) {
  getQuestion(id: $getQuestionId) {
    id
    machineId
    questions {
      text
      answers
    }
    createdAt
  }
}`;

export const GET_ALLPRECHECKLOGS = gql`
  query GetAllPreCheckLogs {
  getAllPreCheckLogs {
    id
    machineId
    questionAnswers {
      questionId
      answerGiven
      comments
    }
    userId
    createdAt
  }
}
`;

export const GET_PRECHECKLOGBYMACHINE = gql`
  query GetQuestionsByMachineId($machineId: ID!) {
  getQuestionsByMachineId(machineId: $machineId) {
    id
    machineId
    questions {
      id
      text
      answers
    }
    createdAt
  }
}
`;
