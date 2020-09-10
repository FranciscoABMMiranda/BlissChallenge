import React from "react";

class HeaderQuestionList extends React.Component {
  render() {
    return (
      <header className="question-header">
        <h1>Question List</h1>
        <input type="text" placeholder="Search question..."></input>
      </header>
    );
  }
}

export default HeaderQuestionList;
