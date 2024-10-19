const Card = require('../models/Card');
const mongoose = require('mongoose');

const getCards = async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).send(cards);
    } catch (error) {
        res.status(500).send('Error getting cards');
    }
}

const updateCard = async (req, res) => {
    try {
        // Verifica si el ID de la tarjeta es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid card ID' });
        }
        // Intenta encontrar la tarjeta por ID y actualizarla con los datos del body
        const card = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Si no se encuentra la tarjeta, envía un 404
        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // Responde con la tarjeta actualizada
        res.status(200).json(card);
    } 
    catch (error) {
        // Maneja posibles errores, como problemas de validación o de la base de datos
        console.error('Error updating card:', error);
        res.status(500).json({ message: 'Error updating card', error: error.message });
    }
};


const deleteCard = async (req, res) => {
    try {
        const card = await Card.findByIdAndDelete(req.params.id);
        if (!card) {
            return res.status(404).send('Card not found'); // Verifica si la tarjeta fue encontrada
        }
        res.status(200).send('Card deleted');
    } catch (error) {
        res.status(500).send('Error deleting card');
    }
}

const createCard = async (req, res) => {
    try {
        const card = new Card(req.body);
        await card.save();
        res.status(201).send(card);
    } catch (error) {
        res.status(500).send(`Error creating card ${error}`);
    }
}

module.exports = { getCards, updateCard, deleteCard, createCard };