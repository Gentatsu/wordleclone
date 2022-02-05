import React, {Component} from "react"

import './App.css';
import {Word} from "./components/Word"
import {Keyboard} from "./components/Keyboard"


 //the class you are making your component from
 class App extends Component {
  // constructor to set state and bind "this"
  allowedAttempts = 6
  wordLength = 5
  alphabet = "qwertyuiopasdfghjklzxcvbnm" 
  done = false
  
  constructor(props) {
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.addLetter = this.addLetter.bind(this);
    this.deleteLastLetter = this.deleteLastLetter.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    var words = []
    for (let i = 0; i < this.allowedAttempts; i++) {
      words.push(<Word number={this.wordLength} ref={React.createRef()}/>)
    }
    var keyboard = <Keyboard alphabet = {this.alphabet} ref={React.createRef()} 
    add={this.addLetter} delete={this.deleteLastLetter} enter={this.checkEnter}/>
    this.state = {
      word: [],
      correctWord:  "",
      currentAttempt : 0,
      words: words,
      keyboard: keyboard
    }    
  }


  // function to handle the click
   handleOnKeyPress(event) {
     // letter a-z, A-z
      if ((event.keyCode >= 65 && event.keyCode <= 90))
      {
        var letter = event.key.toLowerCase()
        this.addLetter(letter)
        
      }
      // backspace
      else if (event.keyCode === 8) 
      {
        this.deleteLastLetter()
      }
      // enter
      else if (event.keyCode === 13)
      {
        this.checkEnter()
      }
  }

  addLetter(letter)
  {
    if (this.state.word.length >= this.wordLength || this.done)
      return
    this.setState({word: [...this.state.word, letter]})
    this.state.words[this.state.currentAttempt].ref.current.add(letter)
  }

  deleteLastLetter()
  {
    if (this.state.word.length <= 0 || this.done)
      return
    var newWord = this.state.word
    newWord.splice(-1)
    this.setState({word: newWord})
    this.state.words[this.state.currentAttempt].ref.current.deleteLastLetter()
  }

  checkEnter()
  {
    if (this.state.word.length !== this.wordLength || this.done)
      return
    if (this.state.word.join('') === this.state.correctWord || this.state.currentAttempt+1 === this.allowedAttempts)
      this.removeKeyPressHandler()
    this.state.words[this.state.currentAttempt].ref.current.enter(this.state.word, this.state.correctWord)
    this.state.keyboard.ref.current.checkAttempt(this.state.word, this.state.correctWord)
    this.setState((state) => {
      return {
        word: "",
        currentAttempt: state.currentAttempt+1
    }})
    // this.wordRef = this.state.currentAttempt < this.allowedAttempts ? this.state.words[this.state.currentAttempt].ref : undefined
  }

  removeKeyPressHandler()
  {
    document.removeEventListener("keydown", this.handleOnKeyPress, false);
    this.done = true
  }

  getWord = async () => {
    const response = await fetch('/word');
    const body = await response.text();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  componentDidMount(){
    document.addEventListener("keydown", this.handleOnKeyPress, false);
    this.getWord()
      .then(res => this.setState({ correctWord: res }))
      .catch(err => console.log(err));
  }

  componentWillUnmount(){
    this.removeKeyPressHandler()
  }
  
  // the render() method to put stuff into the DOM
  render() {
    
    const page = 
     (
        <div className ="centered">
        {this.state.words}
        {this.state.keyboard}
        </div>
    );
    return page
  }
}

export default App;

