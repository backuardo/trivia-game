import React from "react";
import NewGameButton from "../styles/NewGameButton";

const PreGame = props => {
  return (
    <div>
      <h1>It's time for some trivia!</h1>
      <p>
        You have 60 seconds to answer as many questions as possible, good luck!
      </p>
      <NewGameButton onClick={() => props.startGame()}>Start</NewGameButton>
    </div>
  );
};

export default PreGame;
