import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";
import Card from "common/card";
import Player from "components/player";
import Game from "common/game";
import Button from "common/button";
import TextInput from "common/textinput";
import { headShake } from "react-animations";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  seatedPlayers: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  seatedPlayersLabel: {
    marginRight: "10px",
  },
  seatedPlayerIcon: {
    marginRight: "10px",
  },
  nameChooserContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
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
  chooseName: {
    animationName: headShake,
    animationDuration: "1s",
    animationIterationCount: 2,
  },
});

function NameChooser({ onEnter }) {
  const [pendingPlayerName, setPlayerName] = React.useState("");

  const onClickEnter = () => {
    if (pendingPlayerName === "") return;
    setPlayerName("");
    onEnter(pendingPlayerName);
  };

  return (
    <div className={css(styles.nameChooserContainer)}>
      <TextInput
        placeholder="Choose a name"
        value={pendingPlayerName}
        onChange={setPlayerName}
      />
      <Button className="buttons" onClick={onClickEnter}>
        Enter
      </Button>
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
  const playerHasName = playerName !== "Visitor";
  const playerCanJoin = playerHasName && !playerIsSeated && freeSeatsAvailable;
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
  const [numPlayers, setNumPlayers] = React.useState(games[0].game.minPlayers);

  const selectedGameName = game ? game.game.name : "--";

  const gameOptions = games.map((g) => (
    <option key={g.game.name} value={g.game.name}>
      {g.game.name}
    </option>
  ));

  const onClick = () => {
    console.log(selectedGameName);
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
    if (numPlayers < matchingGame.game.minPlayers) {
      setNumPlayers(matchingGame.game.minPlayers);
    }
    if (numPlayers > matchingGame.game.maxPlayers) {
      setNumPlayers(matchingGame.game.minPlayers);
    }
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
    <div className={css(styles.container)}>
      <Game>
        <Card title="Welcome">
          <p>Hi {playerName || ""}, Welcome to the Paper Gamer Lobby!</p>
          {!showNameChooser && nameChosen && (
            <Button onClick={() => setShowNameChooser(true)}>
              Change Name
            </Button>
          )}
          {!showNameChooser && !nameChosen && (
            <div className={css(styles.chooseName)}>
              <Button onClick={() => setShowNameChooser(true)}>
                Choose Name
              </Button>
            </div>
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
    </div>
  );
}
