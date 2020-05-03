const express = require("express");
const SessionController = require("./controllers/SessionController");
const routes = express.Router();

routes.post("/register", SessionController.store);
routes.post("/login", SessionController.authenticate);

module.exports = routes;
