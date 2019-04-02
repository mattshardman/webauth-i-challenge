const express = require("express");
const session = require('express-session');
const { hashSync, compareSync } = require("bcryptjs");

const { checkLoggedIn } = require("./middleware");
const routes = require('./routes/auth');
const helper = require("./data/helpers/userModel");

const app = express();

const sessionConfig = {
    name: "connect.sid",
    secret: "A long secret that no-one will get",
    cookie: {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: false
    },
    httpOnly: true,
    resave: false,
    saveUninitialized: false,
}

app.use(express.json());
app.use(session(sessionConfig));

// app.use(checkLoggedIn);
app.use(routes);

app.listen(3000, () => console.log("Listening"));
