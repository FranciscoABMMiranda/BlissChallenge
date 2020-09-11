import React from "react";
import { CloseButton } from "../../shared";

class DetailScreen extends React.Component {
  state = {
    selected: null,
    renderResults: false,
  };

  // update checked option
  updateChecked(e) {
    this.setState({ selected: e.target.value });
  }

  // update vote results after submitting answer
  updateResults(event) {
    event.preventDefault();
    const { selected } = this.state;
    if (!selected) {
      return alert("No selection made!");
    }
    this.props.updateQuestion(selected);
    this.setState({ renderResults: true });
  }

  // render vote results after submiting form
  renderResults() {}

  // render each radio button
  renderChoice(choice, key, id) {
    return (
      <label key={key}>
        {choice.choice}
        <input
          type="radio"
          name={id}
          value={key}
          onChange={this.updateChecked.bind(this)}
        />
      </label>
    );
  }

  // render form with questions and choices
  renderForm(question) {
    return (
      <form className="question-form">
        <section className="choices">
          {question.choices.map((choice, key) =>
            this.renderChoice(choice, key, question.id)
          )}
        </section>
        <button onClick={this.updateResults.bind(this)}>Submit</button>
      </form>
    );
  }
  render() {
    const { question } = this.props;
    //console.log(question);
    return (
      <section className="detail-screen">
        <CloseButton close={this.props.closeDetails} />
        <header>
          <h1>{question.id}</h1>
          <h2>{question.question}</h2>
        </header>
        {this.renderForm(question)}
      </section>
    );
  }
}

export default DetailScreen;
