import React, { Component } from "react";
import AnswerButton from "./styles/AnswerButton";
import NewGameButton from "./styles/NewGameButton";
import QuestionContainer from "./styles/QuestionContainer";
import "./App.css";

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
    }, 100);
  }

  startGame = () => {
    this.getNewQuestion();
    this.setState({ playing: true, score: 0, time: 600 });
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
      <div className="app">
        {/* start button */}
        {!this.state.playing && this.state.score === null && (
          <div>
            <h1>It's time for some trivia!</h1>
            <p>
              You have 60 seconds to answer as many questions as possible, good
              luck!
            </p>
            <NewGameButton onClick={() => this.startGame()}>
              Start
            </NewGameButton>
          </div>
        )}
        {/* game over / try again */}
        {!this.state.playing && this.state.score !== null && (
          <div>
            <h1>Game over!</h1>
            <h2>Score: {this.state.score}</h2>
            <NewGameButton gameOver onClick={() => this.startGame()}>
              Play again!
            </NewGameButton>
          </div>
        )}
        {/* question and choices */}
        {this.state.playing && this.state.question && (
          <div>
            <h3>
              Score: {this.state.score} Time:{" "}
              {(this.state.time / 10).toFixed(1)}
            </h3>
            <QuestionContainer>
              <h2>{this.state.question}</h2>
            </QuestionContainer>
            {this.state.answers.map(answer => {
              return (
                <div key={answer}>
                  <AnswerButton
                    isCorrect={answer[1]}
                    onClick={() => this.handleChoice(answer)}
                  >
                    {answer[0]}
                  </AnswerButton>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}
export default App;
