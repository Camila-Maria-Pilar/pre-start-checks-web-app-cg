const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
    id: ID!
    username: String!
    password: String!
    role: String!
  }

  type Machine {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Question {
    id: ID!
    machineId: ID!
    questions: String!
    answers: [String!]!
    createdAt: String!
  }

  type PreCheckLog {
    id: ID!
    machineId: ID!
    questionId: ID!
    answerGiven: String!
    comments: String
    userId: ID!
    createdAt: String!
  }

type Query {
  getAllUsers: [User!]!
  getUser(id: ID!): User
  getAllMachines: [Machine!]!
  getMachine(id: ID!): Machine
  getAllQuestions: [Question!]!
  getQuestion(id: ID!): Question
  getAllPreCheckLogs: [PreCheckLog!]!
  getPreCheckLog(id: ID!): PreCheckLog
}

type Mutation {
  
  addUser(username: String!, password: String!, role: String!): User!
  editUser(_id: ID!, username: String, password: String, role: String!): User!
  deleteUser(_id: ID!): Boolean
 
  addMachine(name: String!): Machine!
  editMachine(_id: ID!, name: String!): Machine!
  deleteMachine(_id: ID!): Boolean

  addQuestion(machineId: ID!, questions: String!, answers: [String!]!): Question!
  editQuestion(_id: ID!, machineId: ID!, questions: String!, answers: [String!]!): Question!
  deleteQuestion(_id: ID!): Boolean

  addPreCheckLog(machineId: ID!, questionId: ID!, answerGiven: String!, comments: String, operatorId: ID!): PreCheckLog!
  editPreCheckLog(_id: ID!, machineId: ID!, questionId: ID!, answerGiven: String!, comments: String, userId: ID!): PreCheckLog!
  deletePreCheckLog(_id: ID!): Boolean

}
`;

module.exports = typeDefs;
