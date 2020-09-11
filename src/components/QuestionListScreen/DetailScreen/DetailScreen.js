import React from "react";
import { CloseButton, ShareScreen } from "../../shared";

class DetailScreen extends React.Component {
  state = {
    selected: null,
    shouldRenderResults: false,
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
    this.setState({ shouldRenderResults: true });
  }

  // render vote results after submiting form
  renderResults(question) {
    return question.choices.map((choice) => {
      console.log(choice);
      return (
        <tr className="choice-results" key={choice.choice}>
          <td>{choice.choice}</td>
          <td>{choice.votes}</td>
        </tr>
      );
    });
  }

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
    const { shouldRenderResults } = this.state;
    return (
      <section className="detail-screen">
        <CloseButton close={this.props.closeDetails} />
        <header>
          <h2>{`Question ${question.id}:`}</h2>
          <h1>{question.question}</h1>
        </header>
        <section className="form-container">
          <figure>
            <img src={question.thumb_url} alt="question-img"></img>
          </figure>
          {shouldRenderResults ? (
            <section className="results">
              <p>Results:</p>
              <table>
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Votes</th>
                  </tr>
                </thead>
                <tbody>{this.renderResults(question)}</tbody>
              </table>
            </section>
          ) : (
            this.renderForm(question)
          )}
        </section>
        <ShareScreen />
        <p className="published">{`Published at: ${question.published_at}`}</p>
      </section>
    );
  }
}

export default DetailScreen;
