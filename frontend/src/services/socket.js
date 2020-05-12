import io from 'socket.io-client';

const socket = io.connect('http://localhost:3333');

export default socket;