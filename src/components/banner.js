import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

export class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
  }
  showBanner(message, success = true) {
    this.success = success;
    this.message = message;
    clearInterval(this.hideTimer);
    this.hideTimer = setInterval(() => {
      this.setState({ show: false });
    }, 2000);
    this.setState({ show: true });
  }

  render() {
    return (
      <div
        className={`transition-transform transform ${
          this.state.show ? "" : "-translate-y-full"
        } absolute inset-x-0 top-0 ${
          this.success ? "bg-green-200" : "bg-red-200"
        } py-3 px-14 text-xl text-center`}
      >
        <FontAwesomeIcon
          icon={this.success ? faCheckCircle : faTimesCircle}
          className="mr-4"
        />
        {this.message}
      </div>
    );
  }
}
