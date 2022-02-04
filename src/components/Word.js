import React from "react"
import "./Word.css"
import "./Cell.css"
import Cell, {unused, rightplace, wrongplace} from "./Cell"

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
      // var places = {}
      // var placeIndices = {}
      // var attemptIndices = attempt.map(function(letter) {
      //   return correctWord.indexOf(letter)
      //     }, this)
      // for (let i=0; i < attempt.length; i++)
      // {
      //   var currentStyle = unused
      //   if (attemptIndices[i] === -1)
      //     continue;
      //   var currentCell = this.state.rows[i].ref.current
      //   if (attempt[i] === correctWord[i])
      //   {
      //     places[attempt[i]] = currentStyle = rightplace
      //   }
      //   else
      //     if (!(attempt[i] in places))
      //       places[attempt[i]] = currentStyle = wrongplace
      //   currentCell.updateState(currentStyle) 
      //   // currentCell.updateState(attempt[i] === correctWord[i] ? rightplace: wrongplace) 
      // }
      // console.log(places)
      for (let letter of correctWord)
      {
        let index = attempt.indexOf(letter)
        if (index === -1)
          continue
        this.state.rows[index].ref.current.updateState(correctWord[index] === letter ? rightplace: wrongplace)
      }
    }

    render() {
        return <div className="word">{this.state.rows}</div>
    }
  }
