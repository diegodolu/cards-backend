const mongoose = require('mongoose');
const {Schema} = mongoose;

const cardSchema = new Schema({
    pregunta: { type: String, required: true },
    respuesta: { type: String, required: true },
    // User: { type: Schema.Types.ObjectId, ref: 'User' }
})

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;

