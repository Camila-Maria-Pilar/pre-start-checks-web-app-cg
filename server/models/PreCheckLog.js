const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');  
const dateFormat = require('../utils/dateFormat');

const PreCheckLogSchema = new Schema({
  machineId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  questionId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  answerGiven: { 
    type: String, 
    required: true 
  },
  comments: String,
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  }
}, {
  timestamps: true // Adding Mongoose Timestamps
});

const PreCheckLog = model('PreCheckLog', PreCheckLogSchema);

module.exports = PreCheckLog;
