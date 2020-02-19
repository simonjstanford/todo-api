require('dotenv').config();
var express = require("express");
var bodyParser = require("body-parser");
var todoRoutes = require("./routes/todos");

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.send("Hello from root");
})

app.use("/api/todos/", todoRoutes);

app.listen(port, function() {
    console.log("App is running");
});