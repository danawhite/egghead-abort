import React from 'react';

import Cards from 'react-credit-cards';

import { signal, abortController } from './abort-controller';

import CardForm from './CardForm';
import TransactionStatus from './TransactionStatus';

import 'react-credit-cards/es/styles-compiled.css';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row'
  },
  cardContainer: {
    paddingTop: 20
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  inputContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
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
    backgroundColor: 'blue',
    color: 'snow',
    fontWeight: 'bold',
    height: 42,
    width: '70%',
    borderRadius: 9
  }
};

export default class Checkout extends React.Component {
  state = {
    status: 'idle'
  };

  checkout = () => {
    if (signal.aborted) {
      // this.setState({ status: 'canceled' });
      return Promise.reject(
        new DOMException('Transaction Canceled', 'AbortError')
      );
    }
    return new Promise((resolve, reject) => {
      this.setState({ status: 'processing' });

      setTimeout(() => {
        resolve('Done');
      }, 5000);

      signal.addEventListener('abort', () => {
        reject(new DOMException('Transaction Canceled', 'AbortError'));
      });
    });
  };

  handleCheckout = () => {
    this.checkout()
      .then(result => {
        this.setState({ status: 'success' });
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('abortions');
          this.setState({ status: 'canceled' });
        }
      });
  };

  handleCancel = () => {
    abortController.abort();
  };

  render() {
    return (
      <div style={styles.container}>
        {this.state.status === 'idle' ? (
          <CardForm onCheckout={this.handleCheckout} />
        ) : (
          <TransactionStatus
            status={this.state.status}
            onCancelTransaction={this.handleCancel}
          />
        )}
      </div>
    );
  }
}
