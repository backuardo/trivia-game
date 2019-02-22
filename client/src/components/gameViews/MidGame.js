import React from "react";
import QuestionContainer from "../styles/QuestionContainer";
import GameStatus from "../styles/GameStatus";
import AnswerButton from "../styles/AnswerButton";

const MidGame = props => {
  return (
    <div>
      <GameStatus className={props.time <= 10 ? "warning" : ""}>
        <div className="score">
          <h1>Score: {props.score}</h1>
        </div>
        <div className="time">
          <h1>Time: {props.time}</h1>
        </div>
      </GameStatus>
      <QuestionContainer>
        <p>Q{props.questionNum}</p>
        <hr />
        <h2>{props.question}</h2>
        <hr />
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
