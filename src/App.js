import React, { Component } from 'react';
import './App.css';
import Timepicker from './timepicker/Timepicker';

class App extends Component {

  constructor() {
      super();
      this.state = {
        time: new Date()
      }
  }

  onTimeChange(value) {
    console.log(value);
  }

  render() {
    return (
      <div>
        <Timepicker
          defaultValue={this.state.time}
          onTimeUpdate= {(e) => this.onTimeChange(e)}
        />
      </div>
    );
  }
}

export default App;