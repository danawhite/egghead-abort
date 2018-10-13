import React from 'react';
import ReactDOM from 'react-dom';

import Checkout from './Checkout';

import './styles.css';
import 'react-activity/dist/react-activity.css';

function App() {
  return (
    <div className="App">
      <h1>Checkout</h1>
      <Checkout />
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
