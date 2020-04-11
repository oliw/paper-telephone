// src/server.js
const Server = require("boardgame.io/server").Server;
const TelephoneGame = require("./model/telephone/game").Game;
const SaladbowlGame = require("./model/saladbowl/game").Game;
const server = Server({ games: [SaladbowlGame] });

const port = process.env.PORT || 8000;

server.run(port);
