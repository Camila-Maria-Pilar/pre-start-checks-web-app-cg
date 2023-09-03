import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userId
    token
  }
}
`;

export const LOGOUT_USER = gql`
  mutation Mutation {
  logout
}
`;


export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $role: String!) {
  addUser(username: $username, email: $email, password: $password, role: $role) {
    
    username
    email
    role
    
  }
}
`;

export const EDIT_USER = gql`
  mutation EditUser($id: ID!, $role: String!) {
  editUser(_id: $id, role: $role) {
    
    username
    email
    
    role
    
  }
}
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
  deleteUser(_id: $id)
}
`;



export const ADD_MACHINE = gql`
  mutation AddMachine($name: String!) {
  addMachine(name: $name) {
    
    name
    
  }
}
`;

export const EDIT_MACHINE = gql`
  mutation EditMachine($id: ID!, $name: String!) {
  editMachine(_id: $id, name: $name) {
    
    name
    
  }
}
`;

export const DELETE_MACHINE = gql`
  mutation DeleteMachine($id: ID!) {
  deleteMachine(_id: $id)
}
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($machineId: ID!, $questions: [AnswerInput!]!) {
  addQuestion(machineId: $machineId, questions: $questions) {
    id
    machineId
    questions {
      text
      answers
    }
    
  }
}`;

export const EDIT_QUESTION = gql`
  mutation EditQuestion($id: ID!, $machineId: ID!, $questions: [AnswerInput!]!) {
  editQuestion(_id: $id, machineId: $machineId, questions: $questions) {
    id
    machineId
    questions {
      text
      answers
    }
    
  }
}
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
  deleteQuestion(_id: $id)
}
`;


export const ADD_QUESTION_TO_ARRAY = gql`
  mutation AddQuestionToArray($questionId: ID!, $newQuestion: AnswerInput!) {
  addQuestionToArray(questionId: $questionId, newQuestion: $newQuestion) {
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

export const EDIT_QUESTION_IN_ARRAY = gql`
  mutation EditQuestionInArray($questionId: ID!, $index: Int!, $updatedQuestion: AnswerInput!) {
  editQuestionInArray(questionId: $questionId, index: $index, updatedQuestion: $updatedQuestion) {
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

export const DELETE_QUESTION_FROM_ARRAY = gql`
  mutation DeleteQuestionFromArray($questionId: ID!, $index: Int!) {
  deleteQuestionFromArray(questionId: $questionId, index: $index) {
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

export const ADD_PRECHECKLOG = gql`
  mutation AddPreCheckLog($preCheckLog: PreCheckLogInput!) {
  addPreCheckLog(preCheckLog: $preCheckLog) {
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
