import React, { useState, useEffect }  from "react"
import {cell, number, wrongplace, rightplace} from "./Cell.css"
import classNames from "classnames";


export default class Cell extends React.Component {

  render() {
    const cellComponent = <div className="cell" >
    <div className={classNames({
      letter: true,
      wrongplace: this.props.wrongplace,
      rightplace: this.props.rightplace,
    })}>
      {this.props.letter}</div>
    </div>
    return cellComponent
  }
}
