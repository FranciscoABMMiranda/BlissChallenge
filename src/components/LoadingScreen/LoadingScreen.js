import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

class LoadingScreen extends React.Component {
  render() {
    return (
      <div className="loading">
        <p>
          <LoadingOutlined />
          Loading server connection...
        </p>
      </div>
    );
  }
}

export default LoadingScreen;
