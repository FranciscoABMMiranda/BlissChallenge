import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ShareScreen } from "../shared";
import { DetailScreen } from "./DetailScreen";

class QuestionList extends React.Component {
  state = {
    renderDetails: false,
    selectedQuestion: null,
  };

  // open details page
  openDetails(question) {
    this.setState({ renderDetails: true, selectedQuestion: question });
  }

  // close details page
  closeDetails() {
    this.setState({ renderDetails: false });
  }

  // update question votes and send it to server
  updateQuestion(value) {
    const { selectedQuestion } = this.state;

    selectedQuestion.choices[value]["votes"]++;
    const url = `https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/questions/${selectedQuestion.id}`;
    fetch(url, {
      method: "PUT",
      body: selectedQuestion,
    }).then((response) => {
      console.log(response);
    });
  }

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
              onClick={() => this.openDetails(question)}
            >
              Show details
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { renderDetails, selectedQuestion } = this.state;
    let renderButton = true;

    // if list is not an array then we are filtering. if filtering, do not render "Share" button
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
        {renderDetails ? (
          <DetailScreen
            question={selectedQuestion}
            closeDetails={this.closeDetails.bind(this)}
            updateQuestion={this.updateQuestion.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default QuestionList;
