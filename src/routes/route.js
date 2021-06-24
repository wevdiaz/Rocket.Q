const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
    return res.render("home");
});

route.get("/create_pass", (req, res) => {
    return res.render("create_pass");
} );

route.get("/room", (req, res) => {
    return res.render("room");
});

// route.get("/room/:room/:question/:action");

module.exports = route;