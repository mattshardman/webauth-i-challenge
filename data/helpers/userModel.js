const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);

async function addUser(user) {
  try {
    const result = await db.insert(user).into("users");
    return user;
  } catch (e) {
    return e;
  }
}

async function logIn(user) {
  try {
    const userData = await db("users").where({ user });
    return userData[0];
  } catch (e) {
    return e;
  }
}

async function getUsers(user) {
  try {
    const userData = await db("users");
    const returnedUserData = userData.map(each => each.user);
    return returnedUserData;
  } catch (e) {
    return e;
  }
}

module.exports = { addUser, logIn, getUsers };
