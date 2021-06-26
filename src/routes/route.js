const express = require("express");
const route = express.Router();

const QuestionController = require("../controllers/QuestionController");
const RoomController = require("../controllers/RoomController");


route.get("/", QuestionController.home );

route.get("/create_pass", (req, res) => {
    return res.render("index", { page: "create_pass"});
} );

route.post("/create-room", RoomController.create );
route.get("/room/:room", RoomController.open );

route.post("/question/create", QuestionController.create );
route.post("/question/:room/:question/:action", QuestionController.index );


module.exports = route;