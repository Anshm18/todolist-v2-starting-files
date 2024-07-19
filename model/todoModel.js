const mongoose = require("mongoose");

const todoSchema = {
    name: String
  };

exports.todo = mongoose.model("todo",todoSchema)

exports.todoSchema = todoSchema;
