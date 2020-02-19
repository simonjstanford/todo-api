const mongoose = require("mongoose");
const url = process.env.DB_CONNECTION;
mongoose.set("debug", true);
mongoose.connect(url);
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");