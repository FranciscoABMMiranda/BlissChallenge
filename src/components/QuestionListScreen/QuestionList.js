import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ShareScreen } from "../shared";

class QuestionList extends React.Component {
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
            <button className="details-btn">Show details</button>
          </td>
        </tr>
      );
    });
  }

  render() {
    let renderButton = true;

    // if it is not an array then we are filtering. if filtering, do not render button
    if (!Array.isArray(this.props.list)) renderButton = false;

    return (
      <div>
        <table className="question-list">
          <thead>
            <tr>
              <th>ID</th>
              <th>Question</th>
            </tr>
          </thead>
          <tbody>{this.renderList()}</tbody>
        </table>
        {renderButton ? (
          <section className="add-question">
            <button className="add-btn" onClick={this.props.loadQuestions}>
              <PlusCircleOutlined />
              Load More Questions
            </button>
          </section>
        ) : (
          <ShareScreen />
        )}
      </div>
    );
  }
}

export default QuestionList;
