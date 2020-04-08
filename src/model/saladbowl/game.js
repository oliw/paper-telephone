import { Random } from "boardgame.io/core";

const WORDS_PER_PLAYER = 3;

export const Game = {
  name: "saladbowl",

  setup: ctx => {
    return {
      countdownSeconds: 30,
      groups: [],
      wordsInBowl: [],
      currentWord: null,
      wordsCollected: [],
      passedWord: null,
      countdownStartedAt: null
    };
  },

  phases: {
    PickGroups: {
      moves: {
        ChooseGroups: (G, _ctx, groups) => {
          G.groups = groups;
        }
      },
      endIf: (G, ctx) => {
        // Everyone is in a group
        return G.groups.flat().length === ctx.numPlayers;
      }
    },
    BuildBowl: {
      turn: {
        activePlayers: {
          all: "WriteThings",
          moveLimit: WORDS_PER_PLAYER
        },
        stages: {
          WriteThings: {
            moves: {
              AddWord: (G, ctx, word) => {
                G.wordsInBowl = [...G.wordsInBowl, word];
              }
            }
          }
        }
      },
      endIf: (G, ctx) => {
        // Phase is done if there are enough words in the bowl
        return G.wordsInBowl.length === ctx.numPlayers * WORDS_PER_PLAYER;
      }
    },
    DescribeThings: {
      onBegin: (G, _ctx) => {
        // Shuffle the words
        Random.Shuffle(G, "wordsInBowl");
      },
      endIf: (G, ctx) => {
        // Phase is over once all the words are gone
        return G.wordsInBowl === [] && G.passedWord === null;
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
