const WORDS_PER_PLAYER = 3;

export const Game = {
  name: "saladbowl",
  minPlayers: 4,
  maxPlayers: 20,

  setup: (ctx) => {
    return {
      countdownSeconds: 30,
      groups: [
        // {
        //   score: 0,
        //   players: [],
        //   playOrderPos: 0,
        // }
      ],
      wordsInBowl: [],
      currentWord: null,
      wordsCollected: [],
      countdownStartedAt: null,
      wordsWrittenPerPlayer: WORDS_PER_PLAYER,
      groupOrderPos: 0,
    };
  },

  phases: {
    PickGroups: {
      start: true, // The first phase
      moves: {
        ChooseGroups: (G, _ctx, groups) => {
          G.groups = groups.map((group) => {
            return {
              score: 0,
              players: group,
              playOrderPos: 0,
            };
          });
        },
      },
      endIf: (G, ctx) => {
        // Everyone is in a group
        return G.groups.map((g) => g.players).flat().length === ctx.numPlayers;
      },
      next: "BuildBowl",
    },
    BuildBowl: {
      turn: {
        activePlayers: {
          all: "WriteThings",
          moveLimit: 1,
        },
        stages: {
          WriteThings: {
            moves: {
              AddWords: (G, ctx, words) => {
                G.wordsInBowl = [...G.wordsInBowl, ...words];
              },
            },
          },
        },
      },
      endIf: (G, ctx) => {
        // Phase is done if there are enough words in the bowl
        return G.wordsInBowl.length === ctx.numPlayers * WORDS_PER_PLAYER;
      },
      next: "DescribeThings",
    },
    DescribeThings: {
      endIf: (G, ctx) => {
        // Phase is over automatically once all the words are gone
        return G.wordsInBowl.length === 0 && G.currentWord == null;
      },
      onEnd: (G, _ctx) => {
        // Return all the words to the bowl
        const wordsToReturn = G.wordsCollected;
        G.wordsInBowl = wordsToReturn;
        G.wordsCollected = [];
        // Make sure the clock is reset
        G.countdownStartedAt = null;
      },
      next: "DescribeThings",
      turn: {
        onBegin: (G, ctx) => {
          // Shuffle the words
          G.wordsInBowl = ctx.random.Shuffle(G.wordsInBowl);
          // Make sure the clock is reset
          G.countdownStartedAt = null;
        },
        onEnd: (G, ctx) => {
          // Return word in hand to bowl
          if (G.currentWord) {
            G.wordsInBowl.push(G.currentWord);
            G.currentWord = null;
          }

          const wordsStillInBowl = G.wordsInBowl.length > 0;

          G.groups[G.groupOrderPos].playOrderPos =
            (G.groups[G.groupOrderPos].playOrderPos + 1) %
            G.groups[G.groupOrderPos].players.length;

          // If the turn ended because they ran out of time, play will move to the next
          if (wordsStillInBowl) {
            G.groupOrderPos = (G.groupOrderPos + 1) % G.groups.length;
          }
        },
        endIf: (G, ctx) => {
          // Turn is automatically over once all the words are gone
          return G.wordsInBowl.length === 0 && G.currentWord == null;
        },
        order: {
          first: (G) => {
            const currentGroup = G.groups[G.groupOrderPos];
            const currentPersonInGroup =
              currentGroup.players[currentGroup.playOrderPos];
            debugger;
            return currentPersonInGroup;
          },
          next: (G) => {
            const currentGroup = G.groups[G.groupOrderPos];
            const currentPersonInGroup =
              currentGroup.players[currentGroup.playOrderPos];
            return currentPersonInGroup;
          },
        },
      },
      moves: {
        StartTheClock: (G, _ctx, currentTime) => {
          if (G.countdownStartedAt != null) {
            // Clock is already started
            return;
          }
          // Draw a word
          const words = G.wordsInBowl;
          G.currentWord = words.pop();
          G.wordsInBowl = words;
          // Start the Clock
          G.countdownStartedAt = currentTime;
        },
        ScoreWord: (G, ctx) => {
          if (!G.currentWord) {
            return;
          }
          // Get group for current player
          const currentPlayer = ctx.currentPlayer;
          const currentGroup = G.groups.find((group) =>
            group.players.includes(currentPlayer)
          );
          // Add to score
          currentGroup.score = currentGroup.score += 1;
          // Add word to collectedWords
          const currentWord = G.currentWord;
          G.wordsCollected.push(currentWord);
          G.currentWord = null;
          if (G.wordsInBowl === []) {
            // Stop the clock
            G.countdownStartedAt = null;
          } else {
            // Draw a word
            const words = G.wordsInBowl;
            G.currentWord = words.pop();
            G.wordsInBowl = words;
          }
        },
      },
    },
  },

  endIf: (G, ctx) => {
    const accumulatedPoints = G.groups
      .map((g) => g.score)
      .reduce((a, b) => a + b, 0);
    const numRounds = 3;
    const maxPoints = numRounds * G.wordsWrittenPerPlayer * ctx.numPlayers;
    if (accumulatedPoints < maxPoints) {
      return null;
    } else {
      return true;
    }
  },
};

export default Game;
