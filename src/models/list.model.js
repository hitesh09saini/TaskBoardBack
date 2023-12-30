const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  taskName: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false
  }
});

const SublistSchema = new Schema({
  tasks: [TaskSchema],
});

const ListSchema = new Schema({
  lists: [SublistSchema],
});

const List = model('List', ListSchema);

module.exports = List;
