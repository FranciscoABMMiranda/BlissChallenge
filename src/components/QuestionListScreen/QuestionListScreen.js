import React from "react";
import HeaderQuestionList from "./HeaderQuestionList";
import QuestionList from "./QuestionList";

// query url for searching question
const queryUrl = "?question_filter=";

class QuestionListScreen extends React.Component {
  state = {
    limit: 10,
    offset: 0,
    list: [], // current list of questions
    oldList: [], // tracks list of questions before search query
    searchQuery: null,
  };

  componentDidMount() {
    let query = this.props.location.search;
    // if filtering query is not empty, then render accordingly
    if (query.includes("question_filter")) {
      query = query.slice(query.lastIndexOf("=") + 1); // get question ID
      this.getQuestion(query);
    } else {
      this.getList();
    }
  }

  // get list of questions acording to limit and offset.
  // update list (current list), old list (list before filtering) and offset
  getList() {
    const { limit, offset, list } = this.state;
    let newOffset = limit + offset;
    const url = `https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        const newList = list.concat(json);
        this.setState({ list: newList, oldList: newList, offset: newOffset });
      });
  }

  // get question according to its ID
  // update current list
  getQuestion(query) {
    if (query !== "") {
      const url = `https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/questions/${query}`;
      fetch(url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((json) => this.setState({ list: json }));
    } else this.setState({ list: this.state.oldList });
  }

  // change url to match filtering query
  updateQuery(query) {
    if (query !== "") {
      const newUrl = queryUrl + query;
      this.props.history.push({ search: newUrl });
      return;
    }
    this.props.history.push({ search: "" });
  }

  // changes url and gets question according to filter
  filterQuestions(query) {
    this.updateQuery(query);
    this.getQuestion(query);
  }

  render() {
    return (
      <main className="question-main">
        <HeaderQuestionList filterQuestions={this.filterQuestions.bind(this)} />
        <QuestionList
          list={this.state.list}
          loadQuestions={this.getList.bind(this)}
        />
      </main>
    );
  }
}

export default QuestionListScreen;
