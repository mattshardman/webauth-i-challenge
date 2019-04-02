const express = require("express");
const session = require("express-session");
const SessionStore = require("connect-session-knex")(session);

const authRoutes = require("./api/auth/routes");
const userRoutes = require("./api/users/routes");

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
//   store: new SessionStore({
//     knex: require("./data/database/dbConfig"),
//     tablename: "active_sessions",
//     sidfieldname: "sid",
//     createtable: true,
//     clearInterval: 1000 * 60 * 60
//   })
};

const app = express();

app.use(express.json());
app.use(session(sessionConfig));

app.use(authRoutes);
app.use(userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listening")); //eslint-disable-line
