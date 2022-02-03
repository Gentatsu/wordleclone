import React, {Component} from "react"

import './App.css';
import {Word} from "./components/Word"
import {Keyboard} from "./components/Keyboard"
import update from 'immutability-helper';


 //the class you are making your component from
 class App extends Component {
  // constructor to set state and bind "this"
  allowedAttempts = 6
  word = "abcdefghijklmnopqrstuvwxyz" 
  inputRef = React.createRef();

  state = {
    word: [],
    attempt: Array(this.allowedAttempts).fill(Array(5).fill(-1)),
    wordAttempts: Array(this.allowedAttempts).fill(Array(5).fill("")),
    correctWord:  "moist",
    currentAttempt : 0
}
  constructor(props) {
      super(props);
      this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

  // function to handle the click
   handleOnKeyPress(event) {
      if (this.state.word.length < 5 && ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122)))
      {
        this.setState({word: [...this.state.word, event.key]})
      }
      else if (event.keyCode === 8) 
      {
        var newWord = this.state.word
        newWord.splice(-1)
        this.setState({word: newWord})
      }
      else if (event.keyCode === 13)
      {
        if (this.state.word.length === 5)
        {
          var attempt = this.state.word.map(function(letter) {
            return this.state.correctWord.indexOf(letter)
              }, this)
          const currentIndex = this.state.currentAttempt
          if (this.state.word.join('') === this.state.correctWord)
          {
            document.removeEventListener("keydown", this.handleOnKeyPress, false);
          }
          this.setState((state) => {
            return {
              attempt: update(state.attempt, {[currentIndex]: {$set: attempt}}),
              wordAttempts: update(state.wordAttempts, {[currentIndex]: {$set: state.word}}),
              word: "",
              currentAttempt: state.currentAttempt+1
          }})
          this.inputRef.current.checkAttempt(this.state.wordAttempts, this.state.correctWord)
        }
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
    var words = []
    var alphabet = <Keyboard 
    word = {this.word}
    attempts = {this.state.wordAttempts} 
    correctWord={this.state.correctWord}
    ref={this.inputRef}/>
    for (let i = 0; i < this.allowedAttempts; i++) {
      words.push(<Word number={5} 
        word = {i===this.state.currentAttempt ? this.state.word: this.state.wordAttempts[i]} 
        attempt={this.state.attempt[i]}/>);
    }
    const page = 
     (
        <div>
        {words}
        {alphabet}
        </div>
    );
    return page
  }
}


export default App;
