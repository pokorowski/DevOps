import React, {Component } from 'react'

class Random extends Component {
    constructor(props){
	  super(props)
        this.state = {
	      randomR: 0,
        }
	  };
    
    render() {
	  const rand = Math.random();
	  this.state.randomR = rand;
      this.setState({randomR : this.state.randomR})
      console.log(rand);
      
      return (
        <div>Result: {this.state.randomR} </div>
      );
      
    }
}

export default Random
