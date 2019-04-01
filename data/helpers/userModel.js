const knex = require("knex");
const knexConfig = require("../../knexfile.js");
const db = knex(knexConfig.development);

function addUser(user) {
  db.insert(user)
    .into("users")
    .then(r => console.log(r));
}

async function logIn(user) {
    const userData = await db("users").where({ user });
    return userData[0];
}

module.exports = { addUser, logIn };
