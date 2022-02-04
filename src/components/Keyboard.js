import React  from "react"
import "./Key.css"
import Cell from "./Cell"

// export class Key extends React.Component {


//   render() {
//       const cellComponent = <div className="key" >
//       <div className={classNames({
//         keyletter: true,
//         [this.state.keyState]: true
//       })}>
//         {this.state.letter}</div>
//       </div>
//       return cellComponent
//   }
// }

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
      // console.log(corrects)
      for (let i = 0; i < attempt.length; i++) 
      { 
        var keyfunc = this.state.rows.find(key => key.props.letter === attempt[i]).ref.current;
        if (corrects[i] !== -1)
        {
          if (attempt[i] === correctWord[i])
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
