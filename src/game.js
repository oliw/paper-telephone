class Entry {
  constructor(number) {
    this.number = number;
    this.writing = null;
    this.drawing = null;
    this.author = null;
  }
  setWriting(text, author) {
    this.writing = text;
    this.author = author;
  }
  setDrawing(drawing, author) {
    this.drawing = drawing;
    this.author = author;
  }
  isFilledIn() {
    return this.drawing != null || this.writing != null;
  }
  notFilledIn() {
    return !this.isFilledIn();
  }
}

class Paper {
  constructor(player, numEntries) {
    this.player = player;
    this.entries = Array(numEntries).fill(null);
    for (let i = 0; i < numEntries; i++) {
      this.entries[i] = new Entry(i);
    }
  }

  hasCompletedEntry(entryNumber) {
    if (entryNumber < 0 || entryNumber >= this.entries.length) {
      return false;
    }
    return this.entries[entryNumber].isFilledIn();
  }

  currentUnfilledEntry() {
    return this.entries.find(entry => entry.notFilledIn());
  }

  latestEntry() {
    return this.entries
      .slice()
      .reverse()
      .find(entry => !entry.notFilledIn());
  }
}

function OnBegin(G, ctx) {
  G.currentSubmissionMethod = ctx.turn % 2 === 0 ? "draw" : "write";
}

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

function SubmitWriting(G, ctx, writing, ...args) {
  const { playerID, turn } = ctx;
  const paperIndex = G.playerIdsToPaperIdx[playerID];
  G.papers[paperIndex].entries[turn - 1].setWriting(writing, playerID);
}

function SubmitDrawing(G, ctx, drawing) {
  const { playerID, turn } = ctx;
  const paperIndex = G.playerIdsToPaperIdx[playerID];
  G.papers[paperIndex].entries[turn - 1].setDrawing(drawing, playerID);
}

function isTurnFinished(G, ctx) {
  // The turn is finished when every paper has a complete
  // entry for the currentEntry
  const { turn } = ctx;
  return G.papers.every(paper => paper.hasCompletedEntry(turn - 1));
}

function isGameFinished(G) {
  // The game is finished when there is a filled in entry for the Nth round
  const { numberOfRounds, papers } = G;
  const isFinished = papers.every(paper =>
    paper.hasCompletedEntry(numberOfRounds - 1)
  );

  if (isFinished) {
    return {};
  }

  // Not finished
  return null;
}

const Game = {
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

  endIf: isGameFinished
};

export default Game;
