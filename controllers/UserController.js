const User = require('../models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        res.status(200).send('Sign in successful');
    } catch (error) {
        res.status(500).send('Error signing in');
    }
};

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send('User created successfully');
    } catch (error) {
        res.status(500).send('Error creating user');
    }
};


module.exports = { signIn, signUp };