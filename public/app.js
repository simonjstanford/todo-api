$(document).ready(function() {
    $.getJSON("api/todos").then(addTodos);
    $("#todoInput").keypress(function(e) {
        if (e.which === 13) {
            createTodo();
        }
    })
    $(".list").on("click", "span", function(e) {
        e.stopPropagation();
        removeTodo($(this).parent());
    })
    $(".list").on("click", "li", function() {
        updateTodo($(this));
    })
});

function addTodos(todos) {
    todos.forEach(addTodo);
}

function addTodo(todo) {
    let newTodo = $("<li>" + todo.name + "<span>X</span></li>");
    newTodo.addClass("task");

    if (todo.completed) {
        newTodo.addClass("done");
    }

    newTodo.data("id", todo._id);
    newTodo.data("completed", todo.completed);

    $(".list").append(newTodo);
}

function createTodo() {
    let input = $("#todoInput").val();
    let todo = { name: input };
    $.post("api/todos", todo)
    .then(function(newTodo) {
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    });
}

function removeTodo(todo) {
    let id = todo.data("id");
    $(this).parent().remove();
    $.ajax({
        method: "DELETE",
        url: "api/todos/" + id
    })
    .then(function() {
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    });
}

function updateTodo(todo) {
    let id = todo.data("id");
    let completed = todo.data("completed");
    $.ajax({
        method: "PUT",
        url: "api/todos/" + id,
        data: { completed: !completed }
    })
    .then(function(updatedTodo) {
        todo.toggleClass("done");
        todo.data("completed", !completed);
    });
}