import React, { useState } from "react";
import { createUseStyles } from "react-jss";

import GameBoard from "./components/GameBoard";
import Banner from "./components/Banner";

import { GAME_STATUS } from "./constants";

const useStyles = createUseStyles({
  header: {
    textAlign: "center"
  },
  footer: {
    textAlign: "center"
  }
});

// Attribution: from https://kaz-yamada.github.io/Card-Match-Game
// The main function of the app
const App = () => {
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.CREATING);
  const classes = useStyles();

  const gameFinished = () => {
    setGameStatus(GAME_STATUS.FINISHED);
  };

  const resetGame = () => {
    setGameStatus(GAME_STATUS.RESETTING);
  };

  const setGameToInProgress = () => {
    setGameStatus(GAME_STATUS.IN_PROGRESS);
  };

  return (
    <div>
      <header className={classes.header}>
        <h1>A hand of Poker</h1>
      </header>
      <div>
        <GameBoard
          gameStatus={gameStatus}
          handleStart={setGameToInProgress}
          handleFinish={gameFinished}
        />
        {/* When game is finished, display a message*/}
        {gameStatus === GAME_STATUS.FINISHED && (
          <Banner handleClick={resetGame} />
        )}
      </div>
    </div>
  );
};

// export app for user 
export default App;
