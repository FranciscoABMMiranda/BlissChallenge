import React from "react";
import { CloseButton, ShareScreen } from "../../shared";
import DetailVote from "./DetailVote";
import PropTypes from "prop-types";

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

  render() {
    const { question } = this.props;
    return (
      <section className="detail-screen">
        <CloseButton close={this.props.closeDetails} />
        <header>
          <h2>{`Question ${question.id}:`}</h2>
          <h1>{question.question}</h1>
        </header>
        <DetailVote
          shouldRenderResults={this.state.shouldRenderResults}
          question={this.props.question}
          updateChecked={this.updateChecked.bind(this)}
          updateResults={this.updateResults.bind(this)}
        />
        <ShareScreen />
        <p className="published">{`Published at: ${question.published_at}`}</p>
      </section>
    );
  }
}

DetailScreen.propTypes = {
  question: PropTypes.object,
  updateQuestion: PropTypes.func,
  closeDetails: PropTypes.func,
};

export default DetailScreen;
