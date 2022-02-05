import React  from "react"
import "./Key.css"
import Cell, {unused, rightplace, wrongplace, wrongletter_keyboard} from "./Cell"

export class Keyboard extends React.Component {

  constructor(props) {
    super(props);
    var rows = []
    for (let letter of this.props.alphabet) 
    {
      const addLetter = () => this.props.add(letter)
      var cell = <Cell cellStyle="key" onClick={addLetter} keyStyle="keyletter" letter={letter} ref={React.createRef()}/>
      rows.push(cell);
    }
    this.state = {rows: rows}
  }

  checkAttempt(attempt, correctWord)
  {
    var corrects = attempt.map(letter => (correctWord.indexOf(letter)), this);
    for (let i = 0; i < attempt.length; i++) 
    { 
      var keyfunc = this.state.rows.find(key => key.props.letter === attempt[i]).ref.current;
      if (corrects[i] !== -1)
        keyfunc.updateState(attempt[i] === correctWord[i] ? rightplace: wrongplace)
      else
        keyfunc.updateState(wrongletter_keyboard)
    }
  }

  render() {
      return <div className="keyboard">
        {this.state.rows}
        <Cell cellStyle="key centered bigkey" onClick={this.props.enter} keyStyle="keyletter" letter={"Enter"}/>
        <Cell cellStyle="key centered bigkey" onClick={this.props.delete} keyStyle="keyletter" letter={"<-"}/>
        </div>
  }
}