import React, { useState, useEffect }  from "react"
import Cell from "./Cell"
import word from "./Word.css"

export function updateState(text){
    this.setState({word: text})
    console.log(this.state)
}

export class Word extends React.Component {

    constructor(props) {
        super(props);
      }

    render() {
        var rows = []
        // for (let i = 0; i < this.state.word.length; i++) {
        for (let i = 0; i < this.props.number; i++) {
            rows.push(<Cell letter={this.props.word[i]} number={i}/>);
          }
        //   for (let i = 0; i < this.state.word.length; i++) {
        //     rows[i].letter = this.state.word[i]
        //   }
        return <div className="word">{rows}</div>
    }
  }
