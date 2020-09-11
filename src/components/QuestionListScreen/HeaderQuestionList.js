import React from "react";
import PropTypes from "prop-types";

class HeaderQuestionList extends React.Component {
  // tracks query in search box
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

HeaderQuestionList.propTypes = {
  query: PropTypes.string,
  filterQuestions: PropTypes.func,
};

export default HeaderQuestionList;
