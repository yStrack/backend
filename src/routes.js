const express = require("express");
const SessionController = require("./controllers/SessionController");
const multer = require("multer");
const uploadConfig = require("./config/upload");

const routes = express.Router();

routes.post("/register", SessionController.store);
routes.post("/login", SessionController.authenticate);
routes.post(
  "/update",
  multer(uploadConfig).single("image"),
  SessionController.update
);

module.exports = routes;
