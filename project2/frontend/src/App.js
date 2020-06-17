import React, {Component } from 'react'
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  
  constructor(props){
	super(props)
     this.state = {
	   number1: 1,
	   number2: 1,
	   lcm: 0
	  }
	};

  handleNumber1Change = (event) => {
	this.setState({number1: event.target.value})
  };
	
	
  handleNumber2Change = (event) => {
	this.setState({number2: event.target.value})
  };

  handleSubmit = async (event) => {
    event.preventDefault();
	const res = await axios.get(`/api/${this.state.number1}/${this.state.number2}`);
    this.state.lcm = res.data;
    this.setState({lcm: this.state.lcm})
    console.log(res);
  };


  render() {
   return(
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
     	  <form onSubmit={this.handleSubmit}>
			<div>
			  <ul>
				<li><label>Number 1</label>
				<input
				type="number"
				min="1"
				value={this.state.number1}
				onChange={this.handleNumber1Change}
				/>
				</li>
				<li><label>Number 2</label>
				<input
				type="number" 
				min="1"
				value={this.state.number2}
				onChange={this.handleNumber2Change}
				/>
				</li>
			  </ul>	
			  <button type="submit">Count Least Common Multiple</button>
			  <br/>
			  Result: {this.state.lcm}	
			</div>
		</form>
      </header>
    </div>
   )
  }
	

}

export default App;
