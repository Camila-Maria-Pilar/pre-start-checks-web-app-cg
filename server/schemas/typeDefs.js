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
    id: ID!
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

  type QuestionAnswer {
    questionId: String!
    answerGiven: String!
    comments: String
  }

  input QuestionAnswerInput {
    questionId: String!
    answerGiven: String!
    comments: String
  }


  type PreCheckLog {
    id: ID!
    machineId: String!
    questionAnswers: [QuestionAnswer!]!
    userId: String!
    createdAt: String!
  }

  input PreCheckLogInput {
    machineId: String!
    questionAnswers: [QuestionAnswerInput!]!
    userId: String!
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
    getQuestionsByMachineId(machineId: ID!): [Question]

  }
  

  type Mutation {
    login(email: String!, password: String!): Auth
    logout: Boolean

    addUser(username: String!, email: String!, password: String!, role: String! ): User!    
    editUser(_id: ID!, username: String, password: String, role: String!): User!    
    deleteUser(_id: ID!): Boolean

    addMachine(name: String!): Machine!
    editMachine(_id: ID!, name: String!): Machine!
    deleteMachine(_id: ID!): Boolean

    addQuestion(machineId: ID!, questions: [AnswerInput!]!): Question!
    editQuestion(_id: ID!, machineId: ID!, questions: [AnswerInput!]!): Question!
    deleteQuestion(_id: ID!): Boolean

    addQuestionToArray(questionId: ID!, newQuestion: AnswerInput!): Question!
    editQuestionInArray(questionId: ID!, index: Int!, updatedQuestion: AnswerInput!): Question!
    deleteQuestionFromArray(questionId: ID!, index: Int!): Question!

    addPreCheckLog(preCheckLog: PreCheckLogInput!): PreCheckLog!    
    editPreCheckLog(_id: ID!, preCheckLog: PreCheckLogInput!): PreCheckLog!  
    deletePreCheckLog(_id: ID!): Boolean
  }
`;

module.exports = typeDefs;
