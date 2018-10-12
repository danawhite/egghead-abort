import React from "react";

import { Sentry } from "react-activity";
import Icon from "react-icons-kit";
import { ic_block } from "react-icons-kit/md/ic_block";
import { checkCircle } from "react-icons-kit/fa/checkCircle";
import { close } from "react-icons-kit/fa/close";

import { signal, abortController } from "./abort-controller";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cancelButton: {
    backgroundColor: "red",
    color: "snow",
    padding: 10,
    width: 200,
    borderRadius: 12,
    fontSize: 24
  }
};

class Processing extends React.Component {
  render() {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Sentry size={100} />
        Processing
        <button
          style={styles.cancelButton}
          onClick={() => this.props.onCancel()}
        >
          Cancel
        </button>
      </div>
    );
  }
}

const Cancelled = () => {
  return (
    <div style={{ flex: 1, flexDirection: "column" }}>
      <div style={{ color: "red" }}>
        <Icon icon={ic_block} size={64} />
      </div>
      <h2>Transaction Canceled</h2>
    </div>
  );
};

const Success = () => (
  <div style={{ flex: 1, flexDirection: "column" }}>
    <div style={{ color: "green" }}>
      <Icon icon={checkCircle} size={64} />
    </div>
    <h2>Transaction Successful</h2>
  </div>
);

const Error = () => (
  <div style={{ flex: 1, flexDirection: "column" }}>
    <div style={{ color: "red" }}>
      <Icon icon={close} size={64} />
    </div>
    <h2>Error!!</h2>
  </div>
);

export default class TransactionStatus extends React.Component {
  state = {
    status: this.props.status
  };

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      console.log(`Exactl! ${this.props.status}`);
    }
  }

  getViewForCurrentStatus(status) {
    const views = {
      processing: () => <Processing onCancel={this.cancelTransaction} />,
      success: () => <Success />,
      error: () => <Error />,
      canceled: () => <Cancelled />
    };

    return views[status]();
  }

  cancelTransaction = () => {
    this.props.onCancelTransaction();
  };

  abort = () => {
    abortController.abort();
  };

  render() {
    return (
      <div style={styles.container}>
        {this.getViewForCurrentStatus(this.props.status)}
      </div>
    );
  }
}
