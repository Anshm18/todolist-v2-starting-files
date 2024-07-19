const mongoose = require("mongoose");
const {todoSchema} = require('./todoModel')

const listSchema = {
    name: String,
    lista: [todoSchema]
};

module.exports= (
    mongoose.model("list",listSchema)
)