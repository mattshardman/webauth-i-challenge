const helper = require("./data/helpers/userModel");

async function protected(req, res, next) {
    const { user, token } = req.cookies;
    if (user && token) {
        const userData = await helper.logIn(user);
        const isLoggedIn = userData.token === token
        res.locals.isLoggedIn = isLoggedIn;
    }
    next();
}

module.exports = { protected };
