const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const AnswerSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  },
});

const QuestionSchema = new Schema({
  machineId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  questions: {
    type: [AnswerSchema],
    required: true,
  },
}, {
  timestamps: true, // Adding Mongoose Timestamps
});

const Question = model('Question', QuestionSchema);

module.exports = Question;
