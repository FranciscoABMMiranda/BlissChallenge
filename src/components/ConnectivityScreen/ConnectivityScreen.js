import React from "react";
import { DisconnectOutlined } from "@ant-design/icons";

class ConnectivityScreen extends React.Component {
  render() {
    return (
      <div className="connect">
        <p>
          <DisconnectOutlined />
          Lost connection to internet.
        </p>
      </div>
    );
  }
}

export default ConnectivityScreen;
