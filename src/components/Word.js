import React from "react"
import "./Word.css"
import "./Cell.css"
import Cell from "./Cell"

export class Word extends React.Component {

  currentIndex = 0

  constructor(props) {
    super(props);
    var rows = []
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
      var attemptIndices = attempt.map(function(letter) {
        return correctWord.indexOf(letter)
          }, this)
      for (let i=0; i < attempt.length; i++)
      {
        if (attemptIndices[i] === -1)
          continue;
        var currentCell = this.state.rows[i].ref.current
        currentCell.updateState(attempt[i] === correctWord[i] ? "rightplace": "wrongplace") 
      }
    }

    render() {
        return <div className="word">{this.state.rows}</div>
    }
  }
