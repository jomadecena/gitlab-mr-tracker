import React, { Component } from 'react';

import './App.css';
import Router from './routes';
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  componentDidCatch(error, info) {
    this.setState({hasError: true});
    console.error(error, info);
  }

  render() {
    return (
      <div className="App">
        <Router/>
      </div>
    );
  }
}
