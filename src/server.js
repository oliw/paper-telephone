// src/server.js
const { Server, Mongo } = require("boardgame.io/server");
const TelephoneGame = require("./model/telephone/game").Game;
const SaladbowlGame = require("./model/saladbowl/game").Game;
const server = Server({
  games: [SaladbowlGame, TelephoneGame],
  db: new Mongo({
    url: process.env.MONGODB_URI,
    dbname: "bgio",
  }),
});

const port = process.env.PORT || 8000;

server.run(port);
