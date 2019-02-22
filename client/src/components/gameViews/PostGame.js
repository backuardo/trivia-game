import React from "react";
import NewGameButton from "../styles/NewGameButton";
import NonGameContainer from "../styles/NonGameContainer";

const PostGame = props => {
  return (
    <NonGameContainer>
      <h1>Game over!</h1>
      <hr />
      <h2>Score: {props.score}</h2>
      <NewGameButton gameOver onClick={() => props.startGame()}>
        Play again
      </NewGameButton>
    </NonGameContainer>
  );
};

export default PostGame;
