var db = require("../models");

exports.getTodos = function(req, res) {
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
};

exports.createTodo = function(req, res) {
    let newTodo = req.body;
    db.Todo.create(newTodo)
    .then(function(newTodo) {
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
};

exports.getTodo = function(req, res) {
    let id = req.params.todoId;
    db.Todo.findById(id)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
};

exports.updateTodo = function(req, res) {
    let id = req.params.todoId;
    let todo = req.body;
    db.Todo.findOneAndUpdate({_id: id}, todo, {new: true})
    .then(function(updatedTodo) {
        res.json(updatedTodo);
    })
    .catch(function(err) {
        res.send(err);
    })
};

exports.deleteTodo = function(req, res) {
    let id = req.params.todoId;
    db.Todo.findOneAndDelete({_id: id})
    .then(function() {
        res.json({message: "We deleted it!"});
    })
    .catch(function(err) {
        res.send(err);
    })
};

module.exports = exports;