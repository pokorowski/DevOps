import React, {Component } from 'react'

class Random extends Component {
    constructor(props){
	  super(props)
        this.state = {
	      randomR: null
        }
	  };
	  
   componentWillMount(){
      const rand = Math.floor(Math.random() * 10);
      this.setState({randomR : rand})
      console.log(rand);
   }

    render() {

      return (
        <div>Result: {this.state.randomR} </div>
      );
      
    }
}

export default Random
