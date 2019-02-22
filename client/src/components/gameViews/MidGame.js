import React from "react";
import QuestionContainer from "../styles/QuestionContainer";
import GameStatus from "../styles/GameStatus";
import AnswerButton from "../styles/AnswerButton";

const MidGame = props => {
  return (
    <div>
      <GameStatus className={props.time <= 10 ? "warning" : ""}>
        <h1 className="score">Score: {props.score}</h1>
        <h2 className="time">Time: {props.time}</h2>
      </GameStatus>
      <QuestionContainer>
        <p>Q{props.questionNum}</p>
        <h2>{props.question}</h2>
      </QuestionContainer>
      {props.answers.map(answer => {
        return (
          <div key={answer[0]}>
            <AnswerButton onClick={() => props.handleChoice(answer)}>
              {answer[0]}
            </AnswerButton>
          </div>
        );
      })}
    </div>
  );
};

export default MidGame;
