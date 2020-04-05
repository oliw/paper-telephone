import { Paper, paperHasCompletedEntry } from "./paper";

// TURN
function OnBegin(G, ctx) {
  G.currentSubmissionMethod = ctx.turn % 2 === 0 ? "draw" : "write";
}

// TURN
function OnEnd(G, ctx) {
  // Exchange Papers
  const { numPlayers } = ctx;
  const currentHand = G.playerIdsToPaperIdx;
  const newHand = {};
  Object.keys(currentHand).forEach(playerId => {
    const previousIdx = currentHand[playerId];
    const nextIdx = (numPlayers + previousIdx - 1) % numPlayers;
    newHand[playerId] = nextIdx;
  });
  return {
    ...G,
    playerIdsToPaperIdx: newHand
  };
}

// MOVE
function SubmitWriting(G, ctx, writing, ...args) {
  const { playerID, turn } = ctx;
  const paperIndex = G.playerIdsToPaperIdx[playerID];
  G.papers[paperIndex].entries[turn - 1] = {
    ...G.papers[paperIndex].entries[turn - 1],
    writing,
    author: playerID
  };
}

// MOVE
function SubmitDrawing(G, ctx, drawing) {
  const { playerID, turn } = ctx;
  const paperIndex = G.playerIdsToPaperIdx[playerID];
  G.papers[paperIndex].entries[turn - 1] = {
    ...G.papers[paperIndex].entries[turn - 1],
    drawing,
    author: playerID
  };
}

function isTurnFinished(G, ctx) {
  // The turn is finished when every paper has a complete
  // entry for the currentEntry
  const { turn } = ctx;
  return G.papers.every(paper => paperHasCompletedEntry(paper, turn - 1));
}

function isGameFinished(G) {
  // The game is finished when there is a filled in entry for the Nth round
  const { numberOfRounds, papers } = G;
  const isFinished = papers.every(paper =>
    paperHasCompletedEntry(paper, numberOfRounds - 1)
  );

  if (isFinished) {
    return {};
  }

  // Not finished
  return null;
}

export const Game = {
  name: "paper-telephone",

  setup: ctx => {
    const numPlayers = ctx.numPlayers;
    const numberOfRounds = numPlayers * 2;
    const papers = Array(numPlayers);
    const playerIdsToPaperIdx = {};
    for (let i = 0; i < numPlayers; i++) {
      papers[i] = new Paper(i, numberOfRounds);
      playerIdsToPaperIdx[`${i}`] = i;
    }

    return {
      papers: papers,
      numberOfRounds: numberOfRounds,
      currentSubmissionMethod: null,
      playerIdsToPaperIdx: playerIdsToPaperIdx
    };
  },

  turn: {
    onBegin: OnBegin,
    onEnd: OnEnd,
    endIf: isTurnFinished,
    activePlayers: { all: "submit", moveLimit: 1 },
    stages: {
      submit: {
        moves: {
          SubmitWriting,
          SubmitDrawing
        }
      }
    }
  },

  moves: {},

  endIf: isGameFinished,

  minPlayers: 2,
  maxPlayers: 10
};

export default Game;
