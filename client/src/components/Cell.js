import React  from "react"
import "./Cell.css"
import classNames from "classnames";

export const unused = "unused"
export const rightplace = "rightplace"
export const wrongplace = "wrongplace"
export const wrongletter= "wrongletter"

export default class Cell extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {keyState: unused, letter: this.props.letter}
  }

  updateState(newState)
  {
    this.setState(function(state, props) {
      if (state.keyState === rightplace || (state.keyState === wrongletter && (![wrongplace, rightplace].includes(newState))))
        return {}
      return {keyState: newState};
    });
  } 

  updateLetter(newLetter)
  {
    this.setState({letter: newLetter});
  }

  render() {
    const cellComponent = 
    <div onClick={this.props.onClick} className={this.props.cellStyle} >
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
