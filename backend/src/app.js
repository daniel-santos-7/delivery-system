const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const io = require('socket.io');

const app = express();

const corsConfig = { 
    exposedHeaders:['X-Total-Count']
};

app.use(cors(corsConfig));

app.use(express.json());

app.use(routes);

app.locals.io = io();

module.exports = app;
