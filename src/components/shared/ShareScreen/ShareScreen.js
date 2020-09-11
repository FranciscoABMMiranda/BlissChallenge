import React from "react";
import ShareButton from "./ShareButton";
import ShareWidget from "./ShareWidget";

class ShareScreen extends React.Component {
  state = {
    displayWidget: false,
  };

  // set visibility of ShareWidget
  setWidgetDisplay(display) {
    this.setState({ displayWidget: display });
  }

  render() {
    const { displayWidget } = this.state;
    return (
      <section>
        {displayWidget ? (
          <ShareWidget setWidgetDisplay={this.setWidgetDisplay.bind(this)} />
        ) : (
          <ShareButton setWidgetDisplay={this.setWidgetDisplay.bind(this)} />
        )}
      </section>
    );
  }
}

export default ShareScreen;
