const express = require('express');
const { hashSync, compareSync } = require('bcryptjs');
const helper = require('./data/helpers/userModel');

const app = express();

app.use(express.json());

function hashPassword (req, res, next) {
    const { user, password } = req.body;
    if (user && password) {
        const hash = hashSync(password, 10);
        req.body.token = hash;
        next();
    }  
}

app.use(hashPassword);

app.post('/api/register', (req, res) => {
    const { user, token } = req.body
    helper.addUser({ user, token });
});

app.post('/api/login', async (req,res) => {
    const { user, password } = req.body;
    try {
        const userData = await helper.logIn(user);
        const match = compareSync(password, userData.token);
        res.status(200).json({ message: "Logged in "});
    } catch (e) {
        res.status(500).json({ message: "You shall not pass" })
    }
   
});

app.listen(3000, () => console.log('Listening'));
