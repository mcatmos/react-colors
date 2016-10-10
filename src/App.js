import React, { Component } from 'react';
import Colors from './components/Colors';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="title">
          <h1>React JS Colors</h1>
        </div>
        <div>
          <Colors />
        </div>
      </div>
    );
  }
}

export default App;
