import React from "react";

import { Sentry } from "react-activity";
import Icon from "react-icons-kit";
import { ic_block } from "react-icons-kit/md/ic_block";

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
    console.log(this, this.props);
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
      <h5>Transaction Canceled</h5>
    </div>
  );
};

const Success = () => <div>Success</div>;

const Error = () => <div>Error</div>;

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
    console.log(`Current status: ${status}`);
    // if(status === 'processing') {
    //   return <Processing/>
    // }
    const views = {
      processing: () => <Processing onCancel={this.cancelTransaction} />,
      success: () => <Success />,
      error: () => <Error />,
      canceled: () => <Cancelled />
    };

    // console.log(views[status]);

    return views[status]();
  }

  cancelTransaction = () => {
    this.props.onCancelTransaction();
  };

  abort = () => {
    abortController.abort();
  };

  render() {
    console.log(`render`, this.getViewForCurrentStatus(this.props.status));
    return (
      <div style={styles.container}>
        {this.getViewForCurrentStatus(this.props.status)}
      </div>
    );
  }
}
