import React  from "react"
import "./Key.css"
import Cell, {unused, rightplace, wrongplace, wrongletter_keyboard} from "./Cell"

export class Keyboard extends React.Component {


  constructor(props) {
    super(props);
    var rows = []
    for (let letter of this.props.alphabet) 
    {
      var cell = <Cell cellStyle="key" keyStyle="keyletter" letter={letter} ref={React.createRef()}/>
      rows.push(cell);
    }
    this.state = {rows: rows}
  }

  checkAttempt(attempts, correctWord)
  {
    for (const attempt of attempts)
    {
      var corrects = attempt.map(function(letter) {
        return correctWord.indexOf(letter)
      }, this);
      for (let i = 0; i < attempt.length; i++) 
      { 
        var keyfunc = this.state.rows.find(key => key.props.letter === attempt[i]).ref.current;
        if (corrects[i] !== -1)
          keyfunc.updateState(attempt[i] === correctWord[i] ? rightplace: wrongplace)
        else
          keyfunc.updateState(wrongletter_keyboard)
      }
    }
  }

  render() {
      return <div className="keyboard">{this.state.rows}</div>
  }
}
