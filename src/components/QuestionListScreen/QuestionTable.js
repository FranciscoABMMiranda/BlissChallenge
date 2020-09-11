import React from "react";
import PropTypes from "prop-types";

class QuestionTable extends React.Component {
  // render each question into a table
  // uses the list of questions retrieved in QuestionListScreen
  renderList() {
    let { list } = this.props;
    if (list.length === 0) return null;
    if (!Array.isArray(list)) list = [list]; // if it is not an array (when filtering), transform it

    return list.map((question) => {
      return (
        <tr key={question.id}>
          <td>{question.id}</td>
          <td>{question.question}</td>
          <td>
            <button
              className="details-btn"
              onClick={() => this.props.openDetails(question)}
            >
              Show details
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <table className="question-table">
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

QuestionTable.propTypes = {
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  openDetails: PropTypes.func,
};

export default QuestionTable;
