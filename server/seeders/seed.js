const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
require('../config/connection');
const { User, Machine, Question, PreCheckLog } = require('../models');



const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const seedAll = async () => {
  try {
    await User.deleteMany({});
    await Machine.deleteMany({});
    await Question.deleteMany({});
    await PreCheckLog.deleteMany({});

    const adminUser = await User.create({
      username: 'Chamile',
      email: 'admin@email.com',  
      password: await hashPassword('admin123'),
      role: 'Admin',
    });

    console.log('Created Admin User:', adminUser);
   
    const machines = await Machine.create([
      { name: 'Forklift' },
      { name: 'Bandsaw' },
      { name: 'Welder' },
      { name: 'Plasma' },
    ]);

    const questions = await Question.create([
      {
        machineId: machines[0]._id,
        questions: [
          { text: 'What is the fuel level?', answers: ['Yes', 'No', 'Good', 'Bad'] },
          { text: 'Seatbelt functional?', answers: ['Yes', 'No', 'Good', 'Bad'] },
          { text: 'Tyre pressure?', answers: ['Yes', 'No', 'Good', 'Bad'] },
          { text: 'Engine condition?', answers: ['Yes', 'No', 'Good', 'Bad'] },
        ],
      },
      {
        machineId: machines[1]._id,
        questions: [
          { text: 'Lubricated?', answers: ['Yes', 'No', 'Good', 'Bad'] },
          { text: 'Tyre pressure?', answers: ['Yes', 'No', 'Good', 'Bad'] },
          { text: 'Engine condition?', answers: ['Yes', 'No', 'Good', 'Bad'] },
        ],
      },
    ]);
    console.log('Admin User ID:', adminUser._id); // Should output ObjectId
    
    const preCheckLogs = await PreCheckLog.create([
      {
        machineId: machines[0]._id,
        questionId: questions[0]._id,
        answerGiven: 'good',
        comments: '',
        userId: adminUser._id,
      },

      {
        machineId: machines[1]._id,
        questionId: questions[1]._id,
        answerGiven: 'bad',
        comments: 'need fuilds top-up',
        userId: adminUser._id,
      },
      
    ]);

    console.log('All seeds planted');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAll();
