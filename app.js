const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Importación de rutas
const card_routes = require('./routes/card');

app.use('/api', card_routes);

module.exports = app;
