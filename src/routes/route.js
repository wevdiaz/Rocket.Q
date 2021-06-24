const express = require("express");
const route = express.Router();

const QuestionController = require("../controllers/QuestionController");
const RoomController = require("../controllers/RoomController");


route.get("/", QuestionController.home );

route.get("/create_pass", (req, res) => {
    return res.render("index", { page: "create_pass"});
} );

route.get("/room/:room", (req, res) => {
    return res.render("room");
});

route.post("/question/:room/:question/:action", QuestionController.index );
route.post("/create-room", RoomController.create );

module.exports = route;