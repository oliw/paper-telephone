// src/server.js
const Server = require("boardgame.io/server").Server;
const Game = require("./model/game").Game;
const server = Server({ games: [Game] });

const port = process.env.PORT || 8000;

server.run(port);
