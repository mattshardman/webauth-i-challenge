const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);

function addUser(user) {
  db.insert(user)
    .into("users")
    .then(r => console.log(r));
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
