import React from "react";

import Cards from "react-credit-cards";

const styles = {
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  cardContainer: {
    paddingTop: 20
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column"
  },
  inputContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingTop: 10
  },
  input: {
    flex: 1,
    height: 24,
    borderRadius: 6,
    margin: 10
  },
  cta: {
    flex: 1,
    backgroundColor: "blue",
    color: "snow",
    fontWeight: "bold",
    height: 42,
    width: "70%",
    borderRadius: 9
  }
};

export default class CardForm extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    activeInput: "number"
  };

  initiateTransaction = () => {
    this.props.onCheckout();
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.cardContainer}>
          <Cards
            number={this.state.number}
            name={this.state.name}
            expiry={this.state.expiry}
            cvc={this.state.cvc}
            focused={this.state.activeInput}
          />
        </div>
        <div style={styles.contentContainer}>
          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="number"
              maxLength={16}
              placeholder="4242 4242 4242 4242"
              onFocus={() => this.setState({ activeInput: "number" })}
              onChange={event => this.setState({ number: event.target.value })}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="John Doe"
              onFocus={() => this.setState({ activeInput: "name" })}
              onChange={event => this.setState({ name: event.target.value })}
            />
            <input
              style={styles.input}
              type="number"
              maxlength="5"
              placeholder="MM/YY"
              onFocus={() => this.setState({ activeInput: "expiry" })}
              onChange={event => this.setState({ expiry: event.target.value })}
            />
            <input
              style={styles.input}
              type="number"
              maxlength="3"
              placeholder="CVC"
              onFocus={() => this.setState({ activeInput: "cvc" })}
              onChange={event => this.setState({ cvc: event.target.value })}
            />
          </div>
          <div>
            <button style={styles.cta} onClick={this.initiateTransaction}>
              Pay Now
            </button>
          </div>
        </div>
      </div>
    );
  }
}
