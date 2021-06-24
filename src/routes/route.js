const express = require("express");
const route = express.Router();

const QuestionController = require("../controllers/QuestionController");

route.get("/", (req, res) => {
    return res.render("home");
});

route.get("/create_pass", (req, res) => {
    return res.render("create_pass");
} );

route.get("/room", (req, res) => {
    return res.render("room");
});

route.post("/room/:room/:question/:action", QuestionController.index );

module.exports = route;