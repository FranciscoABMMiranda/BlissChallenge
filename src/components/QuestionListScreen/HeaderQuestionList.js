import React from "react";

class HeaderQuestionList extends React.Component {
  handleChange(event) {
    this.props.filterQuestions(event.target.value);
  }

  render() {
    return (
      <header className="question-header">
        <h1>Question List</h1>
        <input
          type="text"
          placeholder="Search question ID..."
          onChange={this.handleChange.bind(this)}
          value={this.props.query}
        ></input>
      </header>
    );
  }
}

export default HeaderQuestionList;
