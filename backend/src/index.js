const app = require('./app');
const http = require('http');

const server = http.Server(app);

app.locals.io.attach(server);

server.listen(3333);