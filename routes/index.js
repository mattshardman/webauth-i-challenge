const express = require("express");
const routes = express.Router();

const { hashSync, compareSync } = require("bcryptjs");
const helper = require("../data/helpers/userModel");

routes.post("/api/register", (req, res) => {
  const { user, password } = req.body;
  try {
    const token = hashSync(password, 10);
    helper.addUser({ user, token });
    res.status(201).json({ message: "Successfully saved new user" });
  } catch (e) {
    res.status(501).json({ message: `Failed to save user: ${e}` });
  }
});

routes.post("/api/login", async (req, res) => {
  const { user, password } = req.body;
  try {
    const userData = await helper.logIn(user);
    const match = compareSync(password, userData.token);
    if (match) {
      res.cookie("user", user);
      res.cookie("token", userData.token);
      res.status(200).json({ message: "Logged in" });
    } else {
      res.status(400).json({ message: "You shall not pass" });
    }
  } catch (e) {
    res.status(500).json({ message: "You shall not pass" });
  }
});

routes.get("/api/users", async (req, res) => {
  if (res.locals.isLoggedIn) {
    const users = await helper.getUsers();
    res.status(200).json(users);
  }
  res.status(400).send("You are not logged in");
});

module.exports = routes;