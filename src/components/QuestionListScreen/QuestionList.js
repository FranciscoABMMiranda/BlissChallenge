import React from "react";

class QuestionList extends React.Component {
  // render each question into a table
  renderList() {
    const { list } = this.props;
    if (list.length === 0) return null;
    return list.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.id}</td>
          <td>{question.question}</td>
          <td>
            <button className="details-btn">Show details</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="question-list">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>{this.renderList()}</tbody>
      </table>
    );
  }
}

export default QuestionList;
