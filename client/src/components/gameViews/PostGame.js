import React from "react";
import NewGameButton from "../styles/NewGameButton";

const PostGame = props => {
  return (
    <div>
      <h1>Game over!</h1>
      <h2>Score: {props.score}</h2>
      <NewGameButton gameOver onClick={() => props.startGame()}>
        Play again!
      </NewGameButton>
    </div>
  );
};

export default PostGame;
