const { AuthenticationError, UserInputError, ApolloError } = require('apollo-server-express');
const bcrypt = require('bcrypt');
const { User, Machine, Question, PreCheckLog  } = require('../models');
const { signToken } = require('../utils/auth');
// const { checkRole } = require('../utils/checkRoleUtils');

// Helper function to validate user input
const validateUserInput = (username, email, password) => {
  if (!username || !email || !password) {
    throw new UserInputError('All fields are required');
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


const resolvers = {
  Query: {
    getAllUsers: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        const users = await User.find({});
        console.log(users);  
        return users;              
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getUser: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin', 'User'], 'perform this operation');
        return await User.findById(args.id);              
      } catch (err) {
        throw new ApolloError(err.message );
      }
    },

    //For Machines
    getAllMachines: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        return await Machine.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getMachine: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        return await Machine.findById(args.id);
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    
  //For Question
    getAllQuestions: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin', 'Operator'], 'perform this operation');
        return await Question.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getQuestion: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin', 'Operator'], 'perform this operation');
        return await Question.findById(args.id);
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getQuestionsByMachineId: async (parent, args, context) => {
      try {
        // You can add any additional role checks here if you want
        return await Question.find({ machineId: args.machineId });
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    

    //For PreCheckLog
    getAllPreCheckLogs: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin', 'Operator'], 'perform this operation');
        return await PreCheckLog.find({});
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    getPreCheckLog: async (parent, args, context) => {
      try {
        // checkRole(context.user, ['Admin', 'Operator'], 'perform this operation');
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
        // checkRole(context.user, ["Admin"], "Adds users");
        const { username, email, password } = args;
        validateUserInput(username, email, password);
        const newUser = await User.create(args);
        const token = signToken(newUser);
        return newUser;
      } catch (err) {
        throw new UserInputError('Error creating New User', err);
      }
    },

    editUser: async (parent, args, context) => {
      try {
        const { _id, username, password, role } = args;
    
        if (!_id) {
          throw new Error("ID is required");
        }
    
        const user = await User.findById(_id);
    
        if (!user) {
          throw new Error("User not found");
        }
    
        if (username) {
          user.username = username;
        }
        if (password) {
          user.password = await hashPassword(password); 
        }
        if (role) {
          user.role = role;
        }
    
        return await user.save();
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    deleteUser: async (parent, { _id }, context) => {
      
      try {
        // checkRole(context.user, ["Admin"], "delete users");
        await User.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    // For Machine
    addMachine: async (parent, args, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        return await Machine.create(args);
        
      } catch (err) {
        console.error("Error details:", err);
        throw new ApolloError('Error creating a New Machine');
      }
    },

    editMachine: async (parent, args, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        return await Machine.findByIdAndUpdate(args._id, args, { new: true });
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    deleteMachine: async (parent, { _id }, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        await Machine.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    // For Question
    addQuestion: async (parent, args, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        return await Question.create(args);
      } catch (err) {
        throw new UserInputError('Error creating question', err);
      }
    },

    editQuestion: async (parent, args, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        return await Question.findByIdAndUpdate(args._id, args, { new: true });
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    deleteQuestion: async (parent, { _id }, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        await Question.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    addQuestionToArray: async (parent, { questionId, newQuestion }, context) => {
      try {
          let question = await Question.findById(questionId);
          question.questions.push(newQuestion);
          return await question.save();
      } catch (err) {
          throw new ApolloError(err);
      }
  },
  
  editQuestionInArray: async (parent, { questionId, index, updatedQuestion }, context) => {
      try {
          let question = await Question.findById(questionId);
          if (index < 0 || index >= question.questions.length) {
              throw new UserInputError('Invalid index provided.');
          }
          question.questions[index] = updatedQuestion;
          return await question.save();
      } catch (err) {
          throw new ApolloError(err);
      }
  },
  
  deleteQuestionFromArray: async (parent, { questionId, index }, context) => {
      try {
          let question = await Question.findById(questionId);
          if (index < 0 || index >= question.questions.length) {
              throw new UserInputError('Invalid index provided.');
          }
          question.questions.splice(index, 1);
          await question.save();
          return question;
      } catch (err) {
          throw new ApolloError(err);
      }
  },


    // For PreCheckLog
    addPreCheckLog: async (_, { preCheckLog }) => {
      try {
        const newPreCheckLog = new PreCheckLog({
          machineId: preCheckLog.machineId,
          questionAnswers: preCheckLog.questionAnswers,
          userId: preCheckLog.userId,
        });
    
        const result = await newPreCheckLog.save();
        return result;
      } catch (err) {
        console.error(err);
        throw new Error("Could not save pre-check log.");
      }
    },

    editPreCheckLog: async (_id, { preCheckLog }) => {
      try {
        const updatedPreCheckLog = await PreCheckLog.findByIdAndUpdate(
          _id,
          {
            machineId: preCheckLog.machineId,
            questionAnswers: preCheckLog.questionAnswers,
            userId: preCheckLog.userId,
          },
          { new: true }  // This makes sure the updated document is returned
        );
    
        if (!updatedPreCheckLog) {
          throw new Error('PreCheckLog not found');
        }
        
        return updatedPreCheckLog;
      } catch (err) {
        console.error(err);
        throw new Error('Could not update pre-check log.');
      }
    },

    deletePreCheckLog: async (parent, { _id }, context) => {
      
      try {
        // checkRole(context.user, ['Admin'], 'perform this operation');
        await PreCheckLog.findByIdAndDelete(_id);
        return true;
      } catch (err) {
        throw new ApolloError(err);
      }
    },

    login: async (parent, { email, password }) => {
      try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          throw new AuthenticationError('No user found with this email address');
        }
        
        // Validate the password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
          throw new AuthenticationError('Incorrect credentials');
        }
        
        // Generate and return the token
        const token = signToken(user);
        return { userId: user._id, token };
        
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },

    
    logout: () => {
     
      return true;
    }



  },
};

module.exports = resolvers;