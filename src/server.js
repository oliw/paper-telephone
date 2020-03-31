// src/server.js
const Server = require("boardgame.io/server").Server;
const Game = require("./game").Game;
const server = Server({ games: [Game] });

const port = process.env.PORT || 8000;

server.run(port);
