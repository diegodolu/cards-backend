const express = require('express');
const CardController = require('../controllers/CardController');

const api = express.Router();

api.post('/create-card', CardController.createCard);
api.get('/get-cards', CardController.getCards);
api.put('/update-card/:id', CardController.updateCard);
api.delete('/delete-card/:id', CardController.deleteCard);

module.exports = api;