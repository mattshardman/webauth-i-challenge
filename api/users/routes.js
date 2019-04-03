const express = require("express");
const routes = express.Router();

const helper = require("../../data/helpers/userModel");
const { protected } = require("../auth/middleware");

routes.get("/api/users", protected, async (req, res) => {
	try {
		const users = await helper.getUsers();
		return res.status(200).json(users);
	} catch (e) {
		return res.status(500).json({ message: "Server error" });
	}
});

module.exports = routes;
