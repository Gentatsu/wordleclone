import React  from "react"
import {key, keyletter, keyboard, wrongletter_keyboard} from "./Key.css"
import classNames from "classnames";
import update from 'immutability-helper';

export class Key extends React.Component {

  
  constructor(props) {
    super(props);
    this.changeState = this.changeState.bind(this)
    this.getState = this.getState.bind(this)
    this.state = {keyState: "unused", letter: this.props.letter}
  }

  changeState(newState)
  {
      this.setState({keyState: newState})
  }

  getState()
  {
      return this.state.keyState
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
    this.changeState = this.changeState.bind(this)
  }

  changeState(letter, newState)
  {
    // this.setState((state, props) => ({
    //   word, update(word, {[letter]: {keyState: {$set: [newState]}}})
    // }));
    // this.setState(state => (state.word. ))
  }

  render() {
      var rows = []
      for (let i = 0; i < this.props.word.length; i++) 
      {
        var cell = <Key letter={this.props.word[i]}/>
        rows.push(cell);
      }
      for (const attempt of this.props.attempts)
      {
        console.log(attempt)
        var corrects = attempt.map(function(letter) {
          return this.props.correctWord.indexOf(letter)
        }, this);
        console.log(corrects)
        for (let i = 0; i < attempt.length; i++) 
        { 
          if (corrects[i] !== -1)
          {
            if (attempt[i] === this.props.correctWord[i])
            {
              var keydiv = rows.find(cell => cell.props.letter === attempt[i])
              console.log(keydiv)
              console.log(rows[0].getState())
              // .changeState("rightPlace")
            }
          }
        }
      }
      return <div className="keyboard">{rows}</div>
  }
}
