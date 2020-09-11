import React from "react";
import { CloseCircleOutlined } from "@ant-design/icons";

class CloseButton extends React.Component {
  render() {
    return (
      <button className="close-btn" onClick={this.props.close}>
        <CloseCircleOutlined />
      </button>
    );
  }
}

export default CloseButton;
