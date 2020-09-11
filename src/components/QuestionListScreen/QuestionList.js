import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";
import { ShareScreen } from "../shared";
import { DetailScreen } from "./DetailScreen";
import QuestionTable from "./QuestionTable";
import PropTypes from "prop-types";

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

  // updates query in url to mach search query
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

  render() {
    const { renderDetails, selectedQuestion } = this.state;
    let renderButton = true;

    // if list is not an array then we are filtering. if filtering, do not render "Share" button
    if (!Array.isArray(this.props.list)) renderButton = false;

    return (
      <div>
        <QuestionTable
          list={this.props.list}
          openDetails={this.openDetails.bind(this)}
        ></QuestionTable>
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

QuestionList.propTypes = {
  list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  loadQuestions: PropTypes.func,
};

export default QuestionList;
