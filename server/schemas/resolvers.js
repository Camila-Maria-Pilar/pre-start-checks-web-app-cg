const { AuthenticationError, UserInputError, ApolloError } = require('apollo-server-express');
const { User, Machine, Question, PreCheckLog  } = require('../models');
const { signToken } = require('../utils/auth');
const { checkRole } = require('../utils/checkRoleUtils');

// Helper function to validate user input
const validateUserInput = (username, email, password) => {
  if (!username || !email || !password) {
    throw new UserInputError('All fields are required');
  }
};


const resolvers = {
  Query: {
    
    //For Users
    getAllUsers: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await User.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getUser: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await User.findById(args.id);
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    //For Machines
    getAllMachines: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await Machine.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getMachine: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await Machine.findById(args.id);
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    
  //For Question
    getAllQuestions: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN', 'OPERATOR'], 'perform this operation');
        return await Question.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getQuestion: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN', 'OPERATOR'], 'perform this operation');
        return await Question.findById(args.id);
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    //For PreCheckLog
    getAllPreCheckLogs: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN', 'OPERATOR'], 'perform this operation');
        return await PreCheckLog.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getPreCheckLog: async (parent, args, context) => {
      try {
        checkRole(context.user, ['ADMIN', 'OPERATOR'], 'perform this operation');
        return await PreCheckLog.findById(args.id);
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
  },

  Mutation: {
    //For User
    addUser: async (parent, args, context) => {
            
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        const { username, email, password } = args;
        validateUserInput(username, email, password);
        const newUser = await User.create(args);
        const token = signToken(newUser);
        return { token, newUser };
      } catch (err) {
        throw new UserInputError('Error creating New User', err);
      }
    },

    editUser: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        const { username, email, password } = args;
        validateUserInput(username, email, password);
        return await User.findByIdAndUpdate(args._id, args, { new: true });
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    deleteUser: async (parent, { _id }, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        await User.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    // For Machine
    addMachine: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await Machine.create(args);
      } catch (err) {
        throw new UserInputError('Error creating a New Machine', err);
      }
    },

    editMachine: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await Machine.findByIdAndUpdate(args._id, args, { new: true });
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    deleteMachine: async (parent, { _id }, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        await Machine.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    // For Question
    addQuestion: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await Question.create(args);
      } catch (err) {
        throw new UserInputError('Error creating question', err);
      }
    },

    editQuestion: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        return await Question.findByIdAndUpdate(args._id, args, { new: true });
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    deleteQuestion: async (parent, { _id }, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        await Question.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    // For PreCheckLog
    addPreCheckLog: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN', 'OPERATOR'], 'perform this operation');
        return await PreCheckLog.create(args);
      } catch (err) {
        throw new UserInputError('Error creating pre-check log', err);
      }
    },

    editPreCheckLog: async (parent, args, context) => {
      
      try {
        checkRole(context.user, ['ADMIN', 'OPERATOR'], 'perform this operation');
        return await PreCheckLog.findByIdAndUpdate(args._id, args, { new: true });
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    deletePreCheckLog: async (parent, { _id }, context) => {
      
      try {
        checkRole(context.user, ['ADMIN'], 'perform this operation');
        await PreCheckLog.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
};

module.exports = resolvers;