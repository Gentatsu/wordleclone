import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"
import {Word} from "../components/gridCell"
import ReactDOM from 'react-dom'


 //the class you are making your component from
 class IndexPage extends React.Component {
  // constructor to set state and bind "this"
  constructor(props) {
      super(props);
      this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
      this.word = []
    }

  // function to handle the click
   handleOnKeyPress(event) {
      this.word.push(event.key)
      console.log(event);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleOnKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.handleOnKeyPress, false);
  }
  
  // the render() method to put stuff into the DOM
  render() {
    
    const page = 
    // the return() to put your default HTML into the DOM
     (
        // wrapper div of component
      <Layout>
        <Seo title="Home" />
        <Word class="currentWord" number={5} letter={this.word}/>
        <Word number={7}/>
      </Layout>
    );
    return page
  }
}


export default IndexPage
