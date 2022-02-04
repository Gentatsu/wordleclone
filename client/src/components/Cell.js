import React  from "react"
import "./Cell.css"
import classNames from "classnames";

export const unused = "unused"
export const rightplace = "rightplace"
export const wrongplace = "wrongplace"
export const wrongletter_keyboard = "wrongletter_keyboard"

export default class Cell extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {keyState: unused, letter: this.props.letter}
  }

  updateState(newState)
  {
    if (this.state.keyState === rightplace || this.state.keyState === wrongletter_keyboard)
      return;
    this.setState({keyState: newState});
  }

  updateLetter(newLetter)
  {
    this.setState({letter: newLetter});
  }

  render() {
    const cellComponent = 
    <div className={this.props.cellStyle} >
      <div className={classNames({
        [this.props.keyStyle]: true,
        [this.state.keyState]: true
        })}>
        {this.state.letter}
      </div>
    </div>
    return cellComponent
  }
}
