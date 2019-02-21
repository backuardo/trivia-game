import React from "react";
import QuestionContainer from "../styles/QuestionContainer";
import GameStatus from "../styles/GameStatus";
import AnswerButton from "../styles/AnswerButton";

const MidGame = props => {
  return (
    <div>
      <GameStatus className={props.time <= 100 ? "warning" : ""}>
        <h1>Score: {props.score}</h1>
        <h2>{props.time}</h2>
      </GameStatus>
      <QuestionContainer>
        <h3>{props.question}</h3>
      </QuestionContainer>
      {props.answers.map(answer => {
        return (
          <div key={answer}>
            <AnswerButton
              isCorrect={answer[1]}
              onClick={() => props.handleChoice(answer)}
            >
              {answer[0]}
            </AnswerButton>
          </div>
        );
      })}
    </div>
  );
};

export default MidGame;
