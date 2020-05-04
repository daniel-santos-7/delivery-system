const express = require('express');
const routes = require('./routes');
const io = require('socket.io');

const app = express();

app.use(express.json());

app.use(routes);

app.locals.io = io();

io().emit()

module.exports = app;