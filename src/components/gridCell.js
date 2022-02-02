import React from "react"
import * as gridCell from "./cell.module.css"

export function Word({ number }) {
    var rows = []
    for (let i = 0; i < number; i++) {
        rows.push(Container("Hello"));
      }
    return <tbody>{rows}</tbody>
  }

export function Container({ letter }) {
  return <div className={gridCell.cell}>
    <div className={gridCell.number}>{letter}</div>
  </div>
}

// const GridCell = {Container, Word};
// export default GridCell;
