const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  taskName: String,
  status: {
    type: Boolean,
    default: false
  }
});

const SublistSchema = new Schema({
  tasks: [TaskSchema],
  listName: String,
});

const ListSchema = new Schema({
  lists: [SublistSchema],
});

const List = model('List', ListSchema);

module.exports = List;
