import React from "react";
import "./App.css";
import { LoadingScreen } from "./components/LoadingScreen";

class App extends React.Component {
  state = {
    serverStatus: false,
  };

  render() {
    return (
      <div className="App">
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }
}

export default App;
