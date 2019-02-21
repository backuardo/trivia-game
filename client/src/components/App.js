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
    playing: false,
    score: null,
    time: null,
    question: null,
    answers: null
  };

  componentDidMount() {
    this.timer = setInterval(() => {
      this.handleTime();
    }, 1000);
  }

  startGame = () => {
    this.getNewQuestion();
    this.setState({ playing: true, score: 0, time: 60 });
  };

  // update question in state
  getNewQuestion = () => {
    this.fetchQuestion()
      .then(res => {
        this.setState({
          question: res.question,
          answers: [
            [res.a, res.a === res.answer], // [choice, isCorrect]
            [res.b, res.b === res.answer],
            [res.c, res.c === res.answer]
          ]
        });
      })
      .catch(err => console.log(err));
  };

  // fetch question from server
  fetchQuestion = async () => {
    const response = await fetch("/api/question");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  // check if correct, update score, get new question
  handleChoice = answer => {
    answer[1]
      ? this.setState({ score: this.state.score + 10 })
      : this.setState({ score: this.state.score - 5 });

    this.getNewQuestion();
  };

  handleTime = () => {
    const currTime = this.state.time;
    if (this.state.playing && currTime > 0) {
      this.setState({ time: currTime - 1 });
    } else {
      this.setState({ playing: false });
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
    return (
      <AppContainer>
        {/* start button */}
        {!this.state.playing && this.state.score === null && (
          <PreGame startGame={this.startGame} />
        )}
        {/* game over / try again */}
        {!this.state.playing && this.state.score !== null && (
          <PostGame score={this.state.score} startGame={this.startGame} />
        )}
        {/* question and choices */}
        {this.state.playing && this.state.question && (
          <MidGame
            score={this.state.score}
            time={this.state.time}
            question={this.state.question}
            answers={this.state.answers}
            handleChoice={this.handleChoice}
          />
        )}
      </AppContainer>
    );
  }
}
export default App;
