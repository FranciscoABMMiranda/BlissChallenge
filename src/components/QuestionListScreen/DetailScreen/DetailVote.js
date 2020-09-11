import React from "react";
import PropTypes from "prop-types";

class DetailVote extends React.Component {
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
          onChange={this.props.updateChecked.bind(this)}
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
        <button onClick={this.props.updateResults.bind(this)}>Submit</button>
      </form>
    );
  }

  render() {
    const { question, shouldRenderResults } = this.props;
    return (
      <section className="vote-form">
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
    );
  }
}

DetailVote.propTypes = {
  shouldRenderResults: PropTypes.bool,
  question: PropTypes.object,
  updateChecked: PropTypes.func,
  updateResults: PropTypes.func,
};

export default DetailVote;
