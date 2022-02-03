import React, { useState, useEffect }  from "react"
import * as gridCell from "./cell.module.css"

export function Cell( props, ) {
    const cell = <div className={gridCell.cell} key={props.number}>
      <div className={gridCell.number}>{props.letter}</div>
    </div>
    return cell
  }

export function Word(props) {
    var rows = []
    for (let i = 0; i < props.number; i++) {
        rows.push(<Cell letter={props.letter} number={i}/>);
      }
    return <div>{rows}</div>
  }