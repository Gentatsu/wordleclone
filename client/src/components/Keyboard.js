import React  from "react"
import "./Key.css"
import { BsFillBackspaceFill } from 'react-icons/bs';
import Cell, { rightplace, wrongplace, wrongletter} from "./Cell"

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
    const corrects = attempt.map(letter => (correctWord.indexOf(letter)), this);
    for (let i = 0; i < attempt.length; i++) 
    { 
      var keyfunc = this.state.rows.find(key => key.props.letter === attempt[i]).ref.current;
      if (corrects[i] !== -1)
        keyfunc.updateState(attempt[i] === correctWord[i] ? rightplace: wrongplace)
      else
        keyfunc.updateState(wrongletter)
    }
  }

  render() {
      return <div className="keyboard">
        {/* {this.state.rows} */}
        <div className="row">{this.state.rows.slice(0,10)}</div>
        <div className="row">{this.state.rows.slice(10,19)}</div>
        <div  className="row">
          <Cell cellStyle="key centered bigkey" onClick={this.props.enter} keyStyle="keyletter" letter={"enter"}/>
          {this.state.rows.slice(19,26)}
          <Cell cellStyle="key centered bigkey" onClick={this.props.delete} keyStyle="keyletter" letter={<BsFillBackspaceFill/>}/>
        </div>
      </div>
  }
}
