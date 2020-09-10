import React from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";
import { RetryWidget } from "./components/shared";

class App extends React.Component {
  state = {
    serverStatus: false,
    statusFailed: false,
  };

  componentDidMount() {
    this.getServerStatus();
  }

  getServerStatus() {
    const url =
      "https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/health";
    fetch(url, {
      method: "GET",
    }).then((response) => {
      if (response.ok) {
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
    return <div className="App">{this.renderLoading()}</div>;
  }
}

export default App;
