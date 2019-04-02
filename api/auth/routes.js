const express = require("express");
const routes = express.Router();

const { hashSync, compareSync } = require("bcryptjs");
const helper = require("../../data/helpers/userModel");

routes.post("/api/auth/register", async (req, res) => {
	const { user, password } = req.body;

	try {
		const hash = hashSync(password, 10);
		const newUser = await helper.addUser({ user, hash });
		req.session.user = newUser;
		res.status(201).json({ message: "Successfully saved new user" });
	} catch (e) {
		res.status(501).json({ message: `Failed to save user: ${e}` });
	}
});

routes.post("/api/auth/login", async (req, res) => {
	const { user, password } = req.body;

	try {
		const userData = await helper.logIn(user);
		const match = compareSync(password, userData.hash);

		if (match) {
			req.session.user = userData;
			return res.status(200).json({ message: "Logged in" });
		}

		return res.status(401).json({ message: "You shall not pass" });
	} catch (e) {
		res.status(500).json({ message: "You shall not pass" });
	}
});

routes.get("/api/auth/logout", (req, res) => {
	const { session } = req;
	if (session) {
		session.destroy(err => {
			if (err) {
				res.send("error logging out");
			} else {
				res.send("good bye");
			}
		});
	}
});

module.exports = routes;
