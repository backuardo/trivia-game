import React, { Component } from "react";
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
    this.callApi()
      .then(res => {
        this.setState({
          question: res.question,
          a: [res.a, res.a === res.answer],
          b: [res.b, res.b === res.answer],
          c: [res.c, res.c === res.answer]
        });
        console.log(res);
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch("/api/hello");
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleChoice = answer => {
    console.log(answer[0]);
    answer[1]
      ? this.setState({ score: this.state.score + 10 })
      : this.setState({ score: this.state.score - 10 });

    this.callApi()
      .then(res => {
        this.setState({
          question: res.question,
          a: [res.a, res.a === res.answer],
          b: [res.b, res.b === res.answer],
          c: [res.c, res.c === res.answer]
        });
        console.log(res);
      })
      .catch(err => console.log(err));
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
        <h1>Score: {this.state.score}</h1>
        {this.state.question && (
          <div>
            <h2>{this.state.question}</h2>

            <div>
              <button onClick={() => this.handleChoice(this.state.a)}>
                {this.state.a[0]}
              </button>
            </div>

            <div>
              <button onClick={() => this.handleChoice(this.state.b)}>
                {this.state.b[0]}
              </button>
            </div>

            <div>
              <button onClick={() => this.handleChoice(this.state.c)}>
                {this.state.c[0]}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
export default App;
