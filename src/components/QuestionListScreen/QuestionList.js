import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ShareScreen } from "../shared";
import { DetailScreen } from "./DetailScreen";

// query url for question details
const queryUrl = "?question_id=";

class QuestionList extends React.Component {
  state = {
    renderDetails: false,
    selectedQuestion: null,
    query: "",
  };

  componentDidMount() {
    let query = this.props.location.search;
    // if filtering query is not empty, then render accordingly
    if (query.includes("question_id")) {
      query = query.slice(query.lastIndexOf("=") + 1); // get question ID
      this.getQuestion(query);
    }
  }

  // get question according to its ID
  getQuestion(query) {
    if (query !== "") {
      const url = `https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/questions/${query}`;
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => this.openDetails(json));
    }
  }

  updateQuery(query) {
    if (query !== "") {
      const newUrl = queryUrl + query;
      this.props.history.push({ search: newUrl });
    } else this.props.history.push({ search: "" });
    this.setState({ query });
  }

  // open details page
  openDetails(question) {
    this.updateQuery(question.id);
    this.setState({ renderDetails: true, selectedQuestion: question });
  }

  // close details page
  closeDetails() {
    this.updateQuery("");
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
