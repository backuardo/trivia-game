import React, { Component } from "react";
import styled from "styled-components";
import PreGame from "./gameViews/PreGame";
import MidGame from "./gameViews/MidGame";
import PostGame from "./gameViews/PostGame";

const AppContainer = styled.div`
  text-align: center;
`;

class App extends Component {
  state = {
    isPlaying: false,
    score: null,
    timeLeft: null,
    questions: null, // stack of question objects
    currQuestion: null,
    currAnswers: null,
    currQuestionNumber: null
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleTime();
    }, 1000);

    // grab initial stack of questions (to be replenished)
    this.getInitialQuestions();
  }

  // sets state that triggers MidGame ui
  startGame = () => {
    this.getNewQuestion();
    this.setState({
      isPlaying: true,
      score: 0,
      timeLeft: 60,
      currQuestionNumber: 1
    });
  };

  // get initial array of questions (called in componentDidMount)
  getInitialQuestions = () => {
    this.fetchQuestions("/api/manyQuestions")
      .then(res => {
        this.setState({ questions: res });
      })
      .catch(err => console.log(err));
  };

  // fetch new question to replenish stack, update currQuestion/currAnswers
  getNewQuestion = () => {
    let questionStack = this.state.questions;
    let nextQuestion = questionStack.pop();

    this.fetchQuestions("/api/oneQuestion")
      .then(res => {
        questionStack.push(res);
      })
      .catch(err => console.log(err));

    this.setState({
      currQuestion: nextQuestion.question,
      currAnswers: [
        [nextQuestion.a, nextQuestion.a === nextQuestion.answer],
        [nextQuestion.b, nextQuestion.b === nextQuestion.answer],
        [nextQuestion.c, nextQuestion.c === nextQuestion.answer]
      ]
    });
  };

  // fetch one or many questions depending on endpoint
  fetchQuestions = async endpoint => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // check if answer is correct, update score, get new question
  handleChoice = answer => {
    answer[1]
      ? this.setState({ score: this.state.score + 10 })
      : this.setState({ score: this.state.score - 5 });

    this.setState({
      currQuestionNumber: this.state.currQuestionNumber + 1
    });
    this.getNewQuestion();
  };

  // set time, possibly trigger game over
  handleTime = () => {
    const currTime = this.state.timeLeft;
    if (this.state.isPlaying && currTime > 0) {
      this.setState({ timeLeft: currTime - 1 });
    } else {
      this.setState({ isPlaying: false });
    }
  };

  // handleSubmit = async e => {
  //   e.preventDefault();
  //   const response = await fetch("/api/world", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({ post: this.state.post })
  //   });
  //   const body = await response.text();
  //   this.setState({ responseToPost: body });
  // };

  render() {
    const {
      isPlaying,
      score,
      currQuestion,
      timeLeft,
      currAnswers,
      currQuestionNumber
    } = this.state;
    return (
      <AppContainer>
        {/* PREGAME */}
        {!isPlaying && score === null && <PreGame startGame={this.startGame} />}

        {/* MIDGAME */}
        {isPlaying && currQuestion && (
          <MidGame
            score={score}
            time={timeLeft}
            question={currQuestion}
            answers={currAnswers}
            handleChoice={this.handleChoice}
            questionNum={currQuestionNumber}
          />
        )}

        {/* POSTGAME */}
        {!isPlaying && score !== null && (
          <PostGame score={score} startGame={this.startGame} />
        )}
      </AppContainer>
    );
  }
}
export default App;
