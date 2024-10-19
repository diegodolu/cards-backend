const express = require('express');
const UserController = require('../controllers/UserController');

const api = express.Router();

api.post('/register', UserController.signUp);
api.post('/login', UserController.signIn);

module.exports = api;
