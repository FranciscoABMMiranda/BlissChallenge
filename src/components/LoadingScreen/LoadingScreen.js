import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

class LoadingScreen extends React.Component {
  render() {
    return (
      <main className="loading">
        <p>
          <LoadingOutlined />
          Loading server connection...
        </p>
      </main>
    );
  }
}

export default LoadingScreen;
