import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  mainContainer: {
    flexGrow: "1"
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%"
  },
  headerLeft: {
    flex: 1,
    textAlign: "left"
  },
  headerMiddle: {
    flex: 1,
    textAlign: "center"
  },
  headerRight: {
    flex: 1,
    textAlign: "right"
  }
});

function NameChooser({ currentPlayerName, onEnter }) {
  const [playerName, setPlayerName] = React.useState(currentPlayerName);

  const handleInputChange = event => {
    setPlayerName(event.target.value);
  };

  const onClickEnter = () => {
    if (playerName === "") return;
    onEnter(playerName);
  };

  return (
    <div>
      <p className="phase-title">Choose a player name:</p>
      <input type="text" value={playerName} onChange={handleInputChange} />
      <span className="buttons">
        <button className="buttons" onClick={onClickEnter}>
          Enter
        </button>
      </span>
    </div>
  );
}

function ExistingGameChooser({
  rooms,
  playerName,
  handleJoinRoom,
  handleLeaveRoom,
  handleStartGame
}) {
  const games = rooms.map(room => (
    <div key={room.gameID}>
      <ExistingGame
        room={room}
        playerName={playerName}
        handleJoinRoom={handleJoinRoom}
        handleLeaveRoom={handleLeaveRoom}
        handleStartGame={handleStartGame}
      />
    </div>
  ));
  return (
    <div>
      <p>Choose an existing game to play</p>
      <p>There are {rooms.length} games running atm</p>
      {games}
    </div>
  );
}

function ExistingGame({
  room,
  playerName,
  handleJoinRoom,
  handleLeaveRoom,
  handleStartGame
}) {
  const { gameID, gameName, players } = room;
  const playerNames = players.map(p => p.name).join(",");
  const playerSeat = players.find(p => p.name === playerName);
  const playerIsSeated = playerSeat != null;
  const freeSeat = players.find(p => !p.name);
  const freeSeatsAvailable = freeSeat != null;
  const gameIsFullySeated = !freeSeatsAvailable;
  const playerCanJoin = !playerIsSeated && freeSeatsAvailable;
  const playerCanLeave = playerIsSeated;
  const playerCanEnter = playerIsSeated && gameIsFullySeated;

  const startGame = () => {
    handleStartGame(gameName, {
      gameID: gameID,
      playerID: "" + playerSeat.id,
      numPlayers: players.length
    });
  };

  const joinGame = () => {
    handleJoinRoom(gameName, gameID, "" + freeSeat.id);
  };

  const leaveGame = () => {
    handleLeaveRoom(gameName, gameID);
  };

  return (
    <div>
      <p>
        Game: {gameName} (id: {gameID})
      </p>
      <p>Players Seated: {playerNames}</p>
      {playerCanEnter && <button onClick={startGame}>Enter</button>}
      {playerCanJoin && <button onClick={joinGame}>Join</button>}
      {playerCanLeave && <button onClick={leaveGame}>Leave</button>}
    </div>
  );
}

function NewGameCreator({ games, createGame }) {
  const [game, setGame] = React.useState(games[0]);
  const [numPlayers, setNumPlayers] = React.useState(2);

  const selectedGameName = game ? game.game.name : "--";

  const gameOptions = games.map(g => (
    <option key={g.game.name} value={g.game.name}>
      {g.game.name}
    </option>
  ));

  const onClick = () => {
    createGame(selectedGameName, numPlayers);
  };

  const onGameSelected = event => {
    const name = event.target.value;
    if (name === "") {
      setGame(null);
      return;
    }
    const matchingGame = games.find(g => g.game.name === name);
    setGame(matchingGame);
  };

  const onNumPlayersSelected = event => {
    const numPlayers = event.target.value;
    setNumPlayers(numPlayers);
  };

  const createNumPlayersOption = idx => {
    return (
      <option key={"num-option-" + idx} value={idx}>
        {idx}
      </option>
    );
  };

  const createNumPlayersRange = game => {
    return [...new Array(game.game.maxPlayers + 1).keys()].slice(
      game.game.minPlayers
    );
  };

  return (
    <div>
      <p>Lets create a new game</p>
      <p>Which game do you want to play?</p>
      <select value={selectedGameName} onChange={onGameSelected}>
        <option value="">Select Game</option>
        {gameOptions}
      </select>
      <p>And how many players?</p>
      <select value={numPlayers} onChange={onNumPlayersSelected}>
        {createNumPlayersRange(game).map(createNumPlayersOption)}
      </select>
      <button onClick={onClick}>Create</button>
    </div>
  );
}

function RunningGameHeader({
  runningGame,
  runningRoom,
  playerName,
  handleExitRoom
}) {
  if (!runningRoom) {
    return <p>Please wait</p>;
  }
  const gameName =
    runningRoom.gameName === "paper-telephone"
      ? "Paper Telephone"
      : "Unknown Game";
  const exitGame = () => {
    handleExitRoom();
  };
  return (
    <div className={css(styles.headerContainer)}>
      <div className={css(styles.headerLeft)}>
        <button onClick={exitGame}>Leave and return to Lobby</button>
      </div>
      <div className={css(styles.headerMiddle)}>Now playing: {gameName}</div>
      <div className={css(styles.headerRight)}>Playing as: {playerName}</div>
    </div>
  );
}

function RunningGame(props) {
  const { runningGame, rooms, playerName, handleExitRoom } = props;
  const runningRoom = rooms.find(room => room.gameID === runningGame.gameID);
  return (
    <div>
      <RunningGameHeader
        runningGame={runningGame}
        runningRoom={runningRoom}
        playerName={playerName}
        handleExitRoom={handleExitRoom}
      />
      <runningGame.app
        gameID={runningGame.gameID}
        playerID={runningGame.playerID}
        credentials={runningGame.credentials}
      />
    </div>
  );
}

function Lobby(props) {
  const {
    errorMsg,
    gameComponents,
    rooms,
    phase,
    playerName,
    runningGame,
    handleEnterLobby,
    handleExitLobby,
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
    handleExitRoom,
    handleRefreshRooms,
    handleStartGame
  } = props;
  return (
    <div>
      <NameChooser currentPlayerName={playerName} onEnter={handleEnterLobby} />
      <ExistingGameChooser
        rooms={rooms}
        playerName={playerName}
        handleJoinRoom={handleJoinRoom}
        handleLeaveRoom={handleLeaveRoom}
        handleStartGame={handleStartGame}
      />
      <NewGameCreator games={gameComponents} createGame={handleCreateRoom} />
    </div>
  );
}

export default function LobbyRenderer(props) {
  const {
    errorMsg,
    gameComponents,
    gameInstances,
    phase,
    playerName,
    runningGame,
    handleEnterLobby,
    handleExitLobby,
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
    handleExitRoom,
    handleRefreshRooms,
    handleStartGame
  } = props;
  return (
    <div className={css(styles.container)}>
      {runningGame && <RunningGame {...props} />}
      {!runningGame && <Lobby {...props} />}
    </div>
  );
}
