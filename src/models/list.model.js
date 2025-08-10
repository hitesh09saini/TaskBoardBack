const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  taskName: String,
  description: String,
  status: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const SublistSchema = new Schema({
  tasks: [TaskSchema],
  listName: String,
}, {
  timestamps: true
});

const ListSchema = new Schema({
  lists: [SublistSchema],
});

const List = model('List', ListSchema);

module.exports = List;
