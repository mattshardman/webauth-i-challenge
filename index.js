const express = require("express");
const cookieParser = require('cookie-parser');
const { hashSync, compareSync } = require("bcryptjs");
const helper = require("./data/helpers/userModel");

const app = express();

app.use(express.json());
app.use(cookieParser());

async function checkLoggedIn(req, res, next) {
    const { user, token } = req.cookies;
    if (user && token) {
        const userData = await helper.logIn(user);
        const isLoggedIn = userData.token === token
        res.locals.isLoggedIn = isLoggedIn;
    }
    next();
}

app.use(checkLoggedIn);

app.post("/api/register", (req, res) => {
  const { user, password } = req.body;
  try {
    const token = hashSync(password, 10);
    helper.addUser({ user, token });
    res.status(201).json({ message: 'Successfully saved new user'});
  } catch (e) {
    res.status(501).json({ message: `Failed to save user: ${e}` });
  }
});

app.post("/api/login", async (req, res) => {
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

app.get("/api/users", async (req, res) => {
    if (res.locals.isLoggedIn) {
        const users = await helper.getUsers();
        res.status(200).json(users);
    }
    res.status(400).send("You are not logged in")
})

app.listen(3000, () => console.log("Listening"));
