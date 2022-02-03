import React, { useState, useEffect }  from "react"
import Cell from "./Cell"
import word from "./Word.css"

// export function updateState(text){
    // this.setState({word: text})
    // console.log(this.state)
// }

export class Word extends React.Component {


    render() {
        var rows = []
        var attempt = this.props.attempt !== undefined 
        for (let i = 0; i < this.props.number; i++) 
        {
          var wrongplace = false
          var rightplace = false
          if (attempt)
          {
            wrongplace = this.props.attempt[i] !== -1 
            rightplace = this.props.attempt[i] === i 
          }
          var cell = <Cell letter={this.props.word[i]} wrongplace={wrongplace} rightplace={rightplace}/>
          rows.push(cell);
        }
        return <div className="word">{rows}</div>
    }
  }
