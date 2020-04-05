import React from "react";
import { colors } from "styles";
import { StyleSheet, css } from "aphrodite";
import Card from "common/card";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  mainContainer: {
    flexGrow: "1",
    width: "100%",
    minHeight: "100%",
    backgroundColor: colors.blueLight,
    paddingTop: "15px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
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
    textAlign: "right",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  }
});

function Header({ playerName, onChangeNameClick }) {
  const right = playerName ? `Playing as ${playerName}` : "";

  return (
    <div className={css(styles.header)}>
      <div className={css(styles.headerLeft)}></div>
      <div className={css(styles.headerMiddle)}>Game Lobby</div>
      <div className={css(styles.headerRight)}>
        {right}
        {playerName && <button onClick={onChangeNameClick}>Change</button>}
      </div>
    </div>
  );
}

function NameChooser({ onEnter }) {
  const [pendingPlayerName, setPlayerName] = React.useState("");

  const handleInputChange = event => {
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
  handleStartGame,
  handleRequestNewGame
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
      <p>
        Don't see a game to join?{" "}
        <button onClick={handleRequestNewGame}>Host a new game!</button>
      </p>
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

function NewGameCreator({ games, createGame, onDismiss }) {
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
    onDismiss();
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
    handleStartGame
  } = props;

  const [showNameChooser, setShowNameChooser] = React.useState(
    playerName == null
  );

  const [showNewGameForm, setShowNewGameForm] = React.useState(false);

  const handleNameChosen = name => {
    setShowNameChooser(false);
    handleEnterLobby(name);
  };

  return (
    <div className={css(styles.container)}>
      <div className={css(styles.mainContainer)}>
        <Card>
          <p>Hi {playerName || ""}, Welcome to the Lobby !</p>
          {!showNameChooser && (
            <button onClick={() => setShowNameChooser(true)}>
              Change Name
            </button>
          )}
          {showNameChooser && <NameChooser onEnter={handleNameChosen} />}
        </Card>
        <Card>
          <ExistingGameChooser
            rooms={rooms}
            playerName={playerName}
            handleJoinRoom={handleJoinRoom}
            handleLeaveRoom={handleLeaveRoom}
            handleStartGame={handleStartGame}
            handleRequestNewGame={() => setShowNewGameForm(true)}
          />
        </Card>
        {showNewGameForm && (
          <Card>
            <NewGameCreator
              games={gameComponents}
              createGame={handleCreateRoom}
              onDismiss={() => setShowNewGameForm(false)}
            />
          </Card>
        )}
      </div>
    </div>
  );
}
