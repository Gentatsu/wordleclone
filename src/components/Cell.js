import React, { useState, useEffect }  from "react"
import {cell, number} from "./Cell.css"


export default class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  // tick() {
  //   this.setState(state => ({
  //     seconds: state.seconds + 1
  //   }));
  // }

  // componentDidMount() {
  //   this.interval = setInterval(() => this.tick(), 1000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    const cellComponent = <div className="cell" key={this.props.number}>
    <div className="number">{this.props.letter}</div>
    </div>
    return cellComponent
  }
}

// ReactDOM.render(
//   <Timer />,
//   document.getElementById('timer-example')
// );

// export default function Cell( props, ) {
    
//   }

