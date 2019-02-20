import React, { Component } from "react";
import Button from "./styles/Button";
import QuestionContainer from "./styles/QuestionContainer";
import "./App.css";

class App extends Component {
  state = {
    score: 0,
    question: null,
    a: null,
    b: null,
    c: null
  };

  componentDidMount() {
    //this.getNewQuestion();
  }

  // update question in state
  getNewQuestion = () => {
    this.fetchQuestion()
      .then(res => {
        this.setState({
          question: res.question,
          a: [res.a, res.a === res.answer], // [choice, isCorrect]
          b: [res.b, res.b === res.answer],
          c: [res.c, res.c === res.answer]
        });
        console.log(res);
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

  handleChoice = answer => {
    // check if correct, update score
    answer[1]
      ? this.setState({ score: this.state.score + 10 })
      : this.setState({ score: this.state.score - 10 });

    // get a new question
    this.getNewQuestion();
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
        {!this.state.question && (
          <Button onClick={() => this.getNewQuestion()}>Start</Button>
        )}
        {/* question and choices */}
        {this.state.question && (
          <div>
            <h3>Score: {this.state.score}</h3>
            <QuestionContainer>
              <h2>{this.state.question}</h2>
            </QuestionContainer>

            <div>
              <Button onClick={() => this.handleChoice(this.state.a)}>
                {this.state.a[0]}
              </Button>
            </div>

            <div>
              <Button onClick={() => this.handleChoice(this.state.b)}>
                {this.state.b[0]}
              </Button>
            </div>

            <div>
              <Button onClick={() => this.handleChoice(this.state.c)}>
                {this.state.c[0]}
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
