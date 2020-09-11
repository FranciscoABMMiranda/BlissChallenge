import React from "react";
import { ShareAltOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

class ShareButton extends React.Component {
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

ShareButton.propTypes = {
  setWidgetDisplay: PropTypes.func,
};

export default ShareButton;
