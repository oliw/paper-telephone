import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";
import Card from "common/card";
import Player from "components/player";
import Game from "common/game";
import Button from "common/button";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  mainContainer: {
    flexGrow: "1",
    width: "100%",
    minHeight: "100%",
    backgroundColor: colors.blueLight,
    paddingTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  seatedPlayers: {
    display: "flex",
    alignItems: "center",
  },
  seatedPlayersLabel: {
    marginRight: "10px",
  },
  seatedPlayerIcon: {
    marginRight: "10px",
  },
  game: {
    borderRadius: "10px",
    borderStyle: "solid",
    borderColor: colors.blueLight,
    borderWidth: "2px",
    padding: "10px",
  },
  gameContainer: {
    marginBottom: "10px",
  },
});

function NameChooser({ onEnter }) {
  const [pendingPlayerName, setPlayerName] = React.useState("");

  const handleInputChange = (event) => {
    setPlayerName(event.target.value);
  };

  const onClickEnter = () => {
    if (pendingPlayerName === "") return;
    setPlayerName("");
    onEnter(pendingPlayerName);
  };

  return (
    <div>
      <p>Choose a player name:</p>
      <input
        type="text"
        value={pendingPlayerName}
        onChange={handleInputChange}
      />
      <span className="buttons">
        <Button className="buttons" onClick={onClickEnter}>
          Enter
        </Button>
      </span>
    </div>
  );
}

function ExistingGameChooser({
  rooms,
  playerName,
  handleJoinRoom,
  handleLeaveRoom,
  handleStartGame,
  handleRequestNewGame,
}) {
  const games = rooms.map((room) => (
    <div key={room.gameID} className={css(styles.gameContainer)}>
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
      <p>Choose from {rooms.length} existing games</p>
      {games}
      <p>
        Or... <Button onClick={handleRequestNewGame}>Host a new game</Button>
      </p>
    </div>
  );
}

function ExistingGame({
  room,
  playerName,
  handleJoinRoom,
  handleLeaveRoom,
  handleStartGame,
}) {
  const { gameID, gameName, players } = room;
  const playerNames = players.map((p) => p.name).join(",");
  const playerSeat = players.find((p) => p.name === playerName);
  const playerIsSeated = playerSeat != null;
  const freeSeat = players.find((p) => !p.name);
  const freeSeats = players.filter((p) => !p.name);
  const freeSeatsAvailable = freeSeat != null;
  const gameIsFullySeated = !freeSeatsAvailable;
  const playerCanJoin = !playerIsSeated && freeSeatsAvailable;
  const playerCanLeave = playerIsSeated;
  const playerCanEnter = playerIsSeated && gameIsFullySeated;

  const startGame = () => {
    handleStartGame(gameName, {
      gameID: gameID,
      playerID: "" + playerSeat.id,
      numPlayers: players.length,
    });
  };

  const joinGame = () => {
    handleJoinRoom(gameName, gameID, "" + freeSeat.id);
  };

  const leaveGame = () => {
    handleLeaveRoom(gameName, gameID);
  };

  const seatedPlayers = players
    .map((p) => p.name)
    .filter((name) => name != null)
    .map((name) => (
      <div id={name} className={css(styles.seatedPlayerIcon)}>
        <Player name={name} key={name} />
      </div>
    ));

  const formattedGameName =
    gameName === "paper-telephone" ? "Telephone" : gameName;

  return (
    <div className={css(styles.game)}>
      <p>{formattedGameName}</p>
      <div className={css(styles.seatedPlayers)}>
        <p className={css(styles.seatedPlayersLabel)}>Players:</p>
        {seatedPlayers}
      </div>
      {freeSeatsAvailable && (
        <p>Waiting for {freeSeats.length} more players to take a seat</p>
      )}
      {playerCanJoin && <Button onClick={joinGame}>Take a Seat</Button>}
      {playerCanEnter && (
        <div>
          <p>Everyone is sat down!</p>
          <Button onClick={startGame}>Enter the game</Button>
        </div>
      )}
      {playerCanLeave && <Button onClick={leaveGame}>Leave</Button>}
    </div>
  );
}

function NewGameCreator({ games, createGame, onDismiss }) {
  const [game, setGame] = React.useState(games[0]);
  const [numPlayers, setNumPlayers] = React.useState(2);

  const selectedGameName = game ? game.game.name : "--";

  const gameOptions = games.map((g) => (
    <option key={g.game.name} value={g.game.name}>
      {g.game.name}
    </option>
  ));

  const onClick = () => {
    debugger;
    createGame(selectedGameName, numPlayers);
    onDismiss();
  };

  const onGameSelected = (event) => {
    const name = event.target.value;
    if (name === "") {
      setGame(null);
      return;
    }
    const matchingGame = games.find((g) => g.game.name === name);
    setGame(matchingGame);
  };

  const onNumPlayersSelected = (event) => {
    const numPlayers = event.target.value;
    setNumPlayers(numPlayers);
  };

  const createNumPlayersOption = (idx) => {
    return (
      <option key={"num-option-" + idx} value={idx}>
        {idx}
      </option>
    );
  };

  const createNumPlayersRange = (game) => {
    return [...new Array(game.game.maxPlayers + 1).keys()].slice(
      game.game.minPlayers
    );
  };

  return (
    <div>
      <p>Which game do you want to play?</p>
      <select value={selectedGameName} onChange={onGameSelected}>
        {gameOptions}
      </select>
      <p>And how many players?</p>
      <select value={numPlayers} onChange={onNumPlayersSelected}>
        {createNumPlayersRange(game).map(createNumPlayersOption)}
      </select>
      <Button onClick={onClick}>Create</Button>
    </div>
  );
}

export default function Lobby(props) {
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
    handleStartGame,
  } = props;

  const [showNameChooser, setShowNameChooser] = React.useState(
    playerName == null
  );

  const [showNewGameForm, setShowNewGameForm] = React.useState(null);

  const handleNameChosen = (name) => {
    setShowNameChooser(false);
    handleEnterLobby(name);
  };

  const nameChosen = playerName !== "Visitor";

  return (
    <Game>
      <Card title="Welcome">
        <p>Hi {playerName || ""}, Welcome to the Paper Gamer Lobby!</p>
        {!showNameChooser && (
          <Button onClick={() => setShowNameChooser(true)}>
            {nameChosen ? "Change" : "Choose"} Name
          </Button>
        )}
        {showNameChooser && <NameChooser onEnter={handleNameChosen} />}
      </Card>
      {rooms.length > 0 && (
        <Card title="Join a Game">
          <ExistingGameChooser
            rooms={rooms}
            playerName={playerName}
            handleJoinRoom={handleJoinRoom}
            handleLeaveRoom={handleLeaveRoom}
            handleStartGame={handleStartGame}
            handleRequestNewGame={() => setShowNewGameForm(true)}
          />
        </Card>
      )}
      {(showNewGameForm || rooms.length === 0) && (
        <Card title="Create a new Game">
          <NewGameCreator
            games={gameComponents}
            createGame={handleCreateRoom}
            onDismiss={() => setShowNewGameForm(false)}
          />
        </Card>
      )}
    </Game>
  );
}
