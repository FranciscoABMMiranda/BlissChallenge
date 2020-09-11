import React from "react";
import { SendOutlined, CloseCircleOutlined } from "@ant-design/icons";

const emailSubject = "Bliss Challenge";

class ShareWidget extends React.Component {
  state = {
    email: "",
  };

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  render() {
    const { email } = this.state;
    return (
      <section className="share-widget">
        <button
          className="close-widget"
          onClick={() => this.props.setWidgetDisplay(false)}
        >
          <CloseCircleOutlined />
        </button>
        <form>
          <label>Share this page via email.</label>
          <input
            type="email"
            placeholder="bliss@example.com"
            onChange={this.updateEmail.bind(this)}
          ></input>
          <a
            href={`mailto:${email}?subject=${emailSubject}&body=${window.location.href}`}
            onClick={() => this.props.setWidgetDisplay(false)}
          >
            Send Email
            <SendOutlined />
          </a>
        </form>
      </section>
    );
  }
}

export default ShareWidget;
