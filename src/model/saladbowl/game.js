const WORDS_PER_PLAYER = 3;

export const Game = {
  name: "saladbowl",

  setup: ctx => {
    return {
      countdownSeconds: 30,
      groups: [
        // {
        //   score: 0,
        //   players: []
        // }
      ],
      wordsInBowl: [],
      currentWord: null,
      wordsCollected: [],
      passedWord: null,
      countdownStartedAt: null,
      wordsWrittenPerPlayer: WORDS_PER_PLAYER
    };
  },

  phases: {
    PickGroups: {
      start: true, // The first phase
      moves: {
        ChooseGroups: (G, _ctx, groups) => {
          G.groups = groups.map(group => {
            return {
              score: 0,
              players: group
            };
          });
        }
      },
      endIf: (G, ctx) => {
        // Everyone is in a group
        return G.groups.map(g => g.players).flat().length === ctx.numPlayers;
      },
      next: "BuildBowl"
    },
    BuildBowl: {
      turn: {
        activePlayers: {
          all: "WriteThings",
          moveLimit: 1
        },
        stages: {
          WriteThings: {
            moves: {
              AddWords: (G, ctx, words) => {
                G.wordsInBowl = [...G.wordsInBowl, ...words];
              }
            }
          }
        }
      },
      endIf: (G, ctx) => {
        // Phase is done if there are enough words in the bowl
        return G.wordsInBowl.length === ctx.numPlayers * WORDS_PER_PLAYER;
      },
      next: "DescribeThings"
    },
    DescribeThings: {
      onBegin: (G, ctx) => {
        // Shuffle the words
        G.wordsInBowl = ctx.random.Shuffle(G.wordsInBowl);
      },
      endIf: (G, ctx) => {
        // Phase is over once all the words are gone
        return G.wordsInBowl === [] && G.passedWord == null;
      },
      onEnd: (G, _ctx) => {
        // Return all the words to the bowl
        const wordsToReturn = G.wordsCollected;
        if (G.passedWord) {
          wordsToReturn.push(G.passedWord);
        }
        G.wordsInBowl = wordsToReturn;
        G.passedWord = null;
        G.wordsCollected = [];
      },
      next: "DescribeThingsWithOneWord",
      turn: {
        onBegin: (G, ctx) => {
          // Make sure the clock is reset
          G.countdownStartedAt = null;
        }
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
          // Get group for current player
          const currentPlayer = ctx.currentPlayer;
          const currentGroup = G.groups.find(group =>
            group.players.includes(currentPlayer)
          );
          // Add to score
          currentGroup.score = currentGroup.score += 1;
          // Add word to collectedWords
          const currentWord = G.currentWord;
          G.wordsCollected.push(currentWord);
          G.currentWord = null;
          // Draw a word
          const words = G.wordsInBowl;
          G.currentWord = words.pop();
          G.wordsInBowl = words;
        },
        ScoreSkippedWord: (G, ctx) => {
          // Get group for current player
          const currentPlayer = ctx.currentPlayer;
          const currentGroup = G.groups.find(group =>
            group.players.includes(currentPlayer)
          );
          // Add to score
          currentGroup.score = currentGroup.score += 1;
          // Add word to collectedWords
          const passedWord = G.passedWord;
          G.wordsCollected.push(passedWord);
          G.passedWord = null;
        },
        SkipWord: (G, ctx) => {
          if (G.passedWord) {
            return;
          }
          const currentWord = G.currentWord;
          G.currentWord = null;
          G.passedWord = currentWord;
        }
      }
    }
    // DescribeThingsWithOneWord: {},
    // ActThings: {}
  }
};

export default Game;
