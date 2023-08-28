const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    role: String!
    createdAt: String!
  }

  type Machine {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Answer {
    text: String!
    answers: [String!]!
  }

  type Question {
    id: ID!
    machineId: ID!
    questions: [Answer!]!
    createdAt: String!
  }

  input AnswerInput {
    text: String!
    answers: [String!]!
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

  type Auth {
    userId: ID!
    token: String!
  }

  type Query {
    getAllUsers: [User]
    getUser(id: ID!): User
    getAllMachines: [Machine!]
    getMachine(id: ID!): Machine
    getAllQuestions: [Question!]
    getQuestion(id: ID!): Question
    getAllPreCheckLogs: [PreCheckLog!]
    getPreCheckLog(id: ID!): PreCheckLog
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    logout: Boolean

    addUser(
      username: String!
      email: String!
      password: String!
      role: String!
    ): User!
    editUser(_id: ID!, username: String, password: String, role: String!): User!
    deleteUser(_id: ID!): Boolean

    addMachine(name: String!): Machine!
    editMachine(_id: ID!, name: String!): Machine!
    deleteMachine(_id: ID!): Boolean

    addQuestion(machineId: ID!, questions: [AnswerInput!]!): Question!
    editQuestion(
      _id: ID!
      machineId: ID!
      questions: [AnswerInput!]!
    ): Question!
    deleteQuestion(_id: ID!): Boolean

    addPreCheckLog(
      machineId: ID!
      questionId: ID!
      answerGiven: String!
      comments: String
      userId: ID!
    ): PreCheckLog!
    editPreCheckLog(
      _id: ID!
      machineId: ID!
      questionId: ID!
      answerGiven: String!
      comments: String
      userId: ID!
    ): PreCheckLog!
    deletePreCheckLog(_id: ID!): Boolean
  }
`;

module.exports = typeDefs;
