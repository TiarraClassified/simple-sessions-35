import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.state ={
      userInput: '',
      itemsInCart: []
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    axios.post('/api/cart', {item: this.state.userInput})
      .then(res => {
        this.setState({
          itemsInCart: res.data,
          userInput: ''
        })
      })
  }
  handleInputChange(e) {
    this.setState({userInput: e.target.value});
  }

  render() {
    return (
      <div className="App">
        <h3>Type in a new item below that you want stored in the cart.</h3>
        <h3>We are using sessions to keep track of what is added to the cart.</h3>
        <h3>This will help our interaction with the server to be stateful.</h3>
        <input value={this.state.userInput} className='item-input' onChange={this.handleInputChange}/>
        <button className='item-btn' onClick={this.handleClick}>Add New Item to Session Cart</button>
        <br />
        <br />
        <h3>Items currently in cart (on session, coming from our node server):</h3>
        <div>{JSON.stringify(this.state.itemsInCart, null, 2)}</div> 
      </div>
    );
  }
}

export default App;
