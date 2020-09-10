import React from "react";

class QuestionListScreen extends React.Component {
  state = {
    limit: 10,
    offset: 0,
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
      .then((json) => {
        console.log(json);
      });
  }

  render() {
    return <main></main>;
  }
}

export default QuestionListScreen;
