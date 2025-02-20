const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  isComplete: {
    type: String,
    required: true,
  },
  category: {
      type: String,
      required: true,
  }
});

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {    
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tasks: [taskSchema],
});

module.exports = mongoose.model('Project', projectSchema);