import React from "react";
import NewGameButton from "../styles/NewGameButton";
import NonGameContainer from "../styles/NonGameContainer";

const PreGame = props => {
  return (
    <NonGameContainer>
      <h1>
        It's time for some trivia{" "}
        <span aria-label="nerd-emoji" role="img">
          🤓
        </span>
      </h1>
      <hr />
      <h2>You have 60 seconds, good luck!</h2>
      <NewGameButton onClick={() => props.startGame()}>Start</NewGameButton>
    </NonGameContainer>
  );
};

export default PreGame;
