import React  from "react"
import {key, keyletter, keyboard, wrongletter_keyboard} from "./Key.css"
import classNames from "classnames";
import update from 'immutability-helper';

export class Key extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {keyState: "unused", letter: this.props.letter}
  }

  updateState(newState)
  {
    if (this.state.keyState !== "unused")
      return;
    this.setState({keyState: newState});
  }

  render() {
      const cellComponent = <div className="key" >
      <div className={classNames({
        keyletter: true,
        [this.state.keyState]: true
      })}>
        {this.state.letter}</div>
      </div>
      return cellComponent
  }
}

export class Keyboard extends React.Component {


  constructor(props) {
    super(props);
    // this.state.word = props.word.map(function(letter) {
      // return {letter: letter, keyState: "unused"}
    // })
    var rows = []
    for (let letter of this.props.word) 
    {
      var cell = <Key letter={letter} ref={React.createRef()}/>
      rows.push(cell);
    }
    this.changeState = this.changeState.bind(this)
    this.state = {rows: rows}
  }

  changeState(letter, newState)
  {
    // this.setState((state, props) => ({
    //   word, update(word, {[letter]: {keyState: {$set: [newState]}}})
    // }));
    // this.setState(state => (state.word. ))
  }

  checkAttempt(attempts, correctWord)
  {
    for (const attempt of attempts)
    {
      var corrects = attempt.map(function(letter) {
        return correctWord.indexOf(letter)
      }, this);
      // console.log(corrects)
      for (let i = 0; i < attempt.length; i++) 
      { 
        var keyfunc = this.state.rows.find(key => key.props.letter === attempt[i]).ref.current;
        console.log(keyfunc)
        if (corrects[i] !== -1)
        {
          if (attempt[i] === this.props.correctWord[i])
          {
            keyfunc.updateState("rightplace")
          }
          else 
          {
            keyfunc.updateState("wrongplace")
          }
        }
        else
        {
          keyfunc.updateState("wrongletter_keyboard")
        }
      }
    }
  }

  render() {
      return <div className="keyboard">{this.state.rows}</div>
  }
}
