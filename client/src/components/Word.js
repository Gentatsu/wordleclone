import React from "react"
import "./Word.css"
import "./Cell.css"
import Cell, {unused, rightplace, wrongplace} from "./Cell"

function* enumerate (it, start = 0)
{ let i = start
  for (const x of it)
    yield [i++, x]
}

export class Word extends React.Component {

  currentIndex = 0

  constructor(props) {
    super(props);
    var rows = []
    this.add = this.add.bind(this);
    this.deleteLastLetter = this.deleteLastLetter.bind(this);
    this.enter = this.enter.bind(this);
    for (let i=0; i < this.props.number; i++) 
    {
      var cell = <Cell cellStyle="cell" keyStyle="letter" letter="" ref={React.createRef()}/>
      rows.push(cell);
    }
    this.state = {rows: rows}
  }

    add(letter)
    {
      this.state.rows[this.currentIndex].ref.current.updateLetter(letter)
      this.currentIndex += 1
    }

    deleteLastLetter()
    {
      this.currentIndex -= 1
      this.state.rows[this.currentIndex].ref.current.updateLetter("")
    }

    enter(attempt, correctWord)
    {
      for (const [index, letter] of enumerate(correctWord))
      {
        let attemptIndex = attempt.indexOf(letter)
        if (attemptIndex === -1)
          continue
        let correct = letter === attempt[index]
        this.state.rows[correct ? index: attemptIndex].ref.current.updateState(correct ? rightplace: wrongplace)
      }
    }

    render() {
        return <div className="word">{this.state.rows}</div>
    }
  }
