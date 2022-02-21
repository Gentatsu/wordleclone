import React, {Component} from "react"

import './App.css';
import {Word} from "./components/Word"
import {Keyboard} from "./components/Keyboard"
import toast, { Toaster } from 'react-hot-toast';
import ReactGA from 'react-ga';
import words from "./words/words_6.txt";

ReactGA.initialize('UA-48542571-2');
ReactGA.pageview(window.location.pathname + window.location.search);



 //the class you are making your component from
 class App extends Component {
  // constructor to set state and bind "this"
  allowedAttempts = 5
  wordLength = 6
  alphabet = "qwertyuiopasdfghjklzxcvbnm" 
  done = false
  words = []
  
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
    var word = this.state.word.join('')
    if (!this.isValidWord(word))
    {
      toast.error("Invalid wordo", {duration: "100"})
      return
    }
    if (this.state.word.length !== this.wordLength || this.done)
      return
    if (word === this.state.correctWord || this.state.currentAttempt+1 === this.allowedAttempts)
    {
      this.removeKeyPressHandler()
    }
    this.state.words[this.state.currentAttempt].ref.current.enter(this.state.word, this.state.correctWord)
    this.state.keyboard.ref.current.checkAttempt(this.state.word, this.state.correctWord)
    this.setState((state) => {
      return {
        word: "",
        currentAttempt: state.currentAttempt+1
    }})
  }

  removeKeyPressHandler()
  {
    document.removeEventListener("keydown", this.handleOnKeyPress, false);
    this.done = true
    toast(`Word was ${this.state.correctWord}`, {duration: "200", style: {color: '#5da874'}})
    
  }

  getWord = async () => {
    const response = await fetch('/word');
    const body = await response.text();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body.trim();
  };

  loadWords = async () => {
    var r = await fetch(words)
    r = await (await r.text()).split(/\r?\n/);
    this.words = r
  };

  getRandomWord()
  {
      var r = Math.floor(Math.random() * this.words.length);
      var word = this.words[r]
      return word
  }

  isValidWord(word)
  {
      return this.words.includes(word)
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleOnKeyPress, false);
    this.loadWords()
      .then(res => this.setState({ correctWord: "oxford" }))
      // .then(res => this.setState({ correctWord: this.getRandomWord() }))
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
          <img src={require('./lakalogo2.png')} />
          <Toaster/>
          <div className="centered">{this.state.words}</div>
          {this.state.keyboard}
        </div>
    );
    return page
  }
}

export default App;

