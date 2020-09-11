import React from "react";
import { ReloadOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

class RetryWidget extends React.Component {
  render() {
    return (
      <div className="retry-widget">
        <section className="retry-msg">
          <div>
            <ExclamationCircleOutlined />
            Server connection failed.{" "}
            <p>Press the button to retry server connection.</p>
          </div>
          <button className="retry-button" onClick={this.props.retryConnection}>
            <p>
              <ReloadOutlined />
              Retry
            </p>
          </button>
        </section>
      </div>
    );
  }
}

export default RetryWidget;
