import React from "react";
import HeaderQuestionList from "./HeaderQuestionList";
import QuestionList from "./QuestionList";

class QuestionListScreen extends React.Component {
  state = {
    limit: 10,
    offset: 0,
    list: [],
  };

  componentDidMount() {
    this.getList();
  }

  getList() {
    const { limit, offset } = this.state;
    const url = `https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/questions?limit=${limit}&offset=${offset}&filter=`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => this.setState({ list: json }));
  }

  render() {
    return (
      <main className="question-main">
        <HeaderQuestionList />
        <QuestionList list={this.state.list} />
      </main>
    );
  }
}

export default QuestionListScreen;
