import React from "react";
import { ShareAltOutlined } from "@ant-design/icons";

class ShareScreen extends React.Component {
  render() {
    return (
      <button
        className="share"
        onClick={() => this.props.setWidgetDisplay(true)}
      >
        <ShareAltOutlined />
        <p>Share by email</p>
      </button>
    );
  }
}

export default ShareScreen;
