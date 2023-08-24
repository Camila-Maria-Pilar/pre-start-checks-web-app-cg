const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');  
const dateFormat = require('../utils/dateFormat');

const MachineSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true // Adding Mongoose Timestamps
});

const Machine = model('Machine', MachineSchema);

module.exports = Machine;
