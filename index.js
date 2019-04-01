const express = require("express");
const cookieParser = require('cookie-parser');
const { hashSync, compareSync } = require("bcryptjs");
const { checkLoggedIn } = require("./middleware");
const routes = require('./routes');
const helper = require("./data/helpers/userModel");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(checkLoggedIn);
app.use(routes);

app.listen(3000, () => console.log("Listening"));
