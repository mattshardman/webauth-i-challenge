const db = require("../database/dbConfig");

const addUser = async user => {
	try {
		await db.insert(user).into("users");
		return user;
	} catch (e) {
		return e;
	}
};

const logIn = async user => {
	try {
		const userData = await db("users").where({ user });
		return userData[0];
	} catch (e) {
		return e;
	}
};

const getUsers = async () => {
	try {
		const userData = await db("users");
		const returnedUserData = userData.map(each => each.user);
		return returnedUserData;
	} catch (e) {
		return e;
	}
};

module.exports = { addUser, logIn, getUsers };
