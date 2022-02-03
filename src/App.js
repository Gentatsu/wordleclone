import React, {Component} from "react"

import './App.css';
import {Word} from "./components/Word"


 //the class you are making your component from
 class App extends Component {
  // constructor to set state and bind "this"

  state = {
    word: []
}
  constructor(props) {
      super(props);
      this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

  // function to handle the click
   handleOnKeyPress(event) {
      if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122))
      {
        this.setState({word: [...this.state.word, event.key]})
        // var currentWord = document.getElementById("currentWord")
        // currentWord.setState({word: this.word})
      }
      else if (event.keyCode === 8) 
      {
        this.state.word.splice(-1)
        this.setState(this.state)
      }
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleOnKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleOnKeyPress, false);
  }
  
  // the render() method to put stuff into the DOM
  render() {
    
    const page = 
     (
        // wrapper div of component
        <div>
          <Word number={5} word={this.state.word}/>
          <Word number={5} word=""/>
          <Word number={5} word=""/>
          <Word number={5} word=""/>
          <Word number={5} word=""/>
        </div>
    );
    return page
  }
}


export default App;
