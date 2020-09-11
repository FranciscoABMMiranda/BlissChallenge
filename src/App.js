import React from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { QuestionListScreen } from "./components/QuestionListScreen";
import { RetryWidget, Header } from "./components/shared";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ConnectivityScreen } from "./components/ConnectivityScreen";

class App extends React.Component {
  state = {
    serverStatus: false,
    statusFailed: false,
    connection: true,
  };

  componentDidMount() {
    this.getServerStatus();

    // adds event listeners for when we lose internet connection
    window.addEventListener("online", this.handleConnectionChange.bind(this));
    window.addEventListener("offline", this.handleConnectionChange.bind(this));

    this.setState({ connection: navigator.onLine ? true : false });
  }

  // handles loss of internet connection
  handleConnectionChange() {
    this.setState({ connection: navigator.onLine ? true : false });
    this.retryConnection();
  }

  getServerStatus() {
    const url =
      "https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/health";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === "OK") {
          this.setState({ serverStatus: true, statusFailed: false });
          console.log("Server connection established!");
        } else {
          this.setState({ statusFailed: true });
        }
      });
  }

  retryConnection() {
    this.getServerStatus();
  }

  renderLoading() {
    const { statusFailed, serverStatus } = this.state;
    if (statusFailed) {
      return <RetryWidget retryConnection={this.retryConnection.bind(this)} />;
    }
    return serverStatus ? null : <LoadingScreen />;
  }

  render() {
    const { connection } = this.state;
    return (
      <Router basename="/questions">
        <div className="App">
          {this.renderLoading()}
          {connection ? null : <ConnectivityScreen />}
          <Header />
          <Route exact path="/" component={QuestionListScreen}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
