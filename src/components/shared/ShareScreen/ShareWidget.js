import React from "react";
import { CloseButton } from "../../shared";
import { SendOutlined } from "@ant-design/icons";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class ShareWidget extends React.Component {
  state = {
    email: "",
  };

  share(event) {
    event.preventDefault();
    const { email } = this.state;
    if (validateEmail(email)) {
      const url = `https://private-anon-7eb2956589-blissrecruitmentapi.apiary-mock.com/share?destination_email=${email}&content_url=${window.location.href}`;
      fetch(url, {
        method: "POST",
      }).then((response) => {
        console.log(response);
      });
      this.closeWidget();
    } else {
      alert("Invalid email!");
    }
  }

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  closeWidget() {
    this.props.setWidgetDisplay(false);
  }

  render() {
    return (
      <section className="share-widget">
        <CloseButton close={this.closeWidget.bind(this)} />
        <form>
          <label>Share this page via email.</label>
          <input
            type="email"
            placeholder="bliss@example.com"
            onChange={this.updateEmail.bind(this)}
          ></input>
          <button onClick={this.share.bind(this)}>
            Send Email
            <SendOutlined />
          </button>
        </form>
      </section>
    );
  }
}

export default ShareWidget;
