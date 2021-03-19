import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Image from "../../components/Image/Image";
import pictures from "../../data-mockup/pricture-url-mockup";

import "./Homepage.scss";

export default class Homepage extends Component {
  state = {
    displayItems: null,
  };

  getThreeItems = () => {
    let a = 0;
    let b = 0;
    let c = 0;

    while (a == b || b == c || a == c) {
      a = Math.floor(Math.random() * 15);
      console.log(a);
      b = Math.floor(Math.random() * 15);
      console.log(b);
      c = Math.floor(Math.random() * 15);
      console.log(c);
    }
    this.setState({ displayItems: [a, b, c] });
  };

  componentDidMount() {
    this.getThreeItems();
  }


  render() {
    return (
      <div className="app-homepage">
        <div className="app-homepage__container">
          {this.state.displayItems &&
            this.state.displayItems.map((el, idx) => {
              return <Image key={idx} src={pictures[el].url} alt={pictures[el].alt} />;
            })}
        </div>
        <div className="app-homepage__button-container">
        <Button onClick={this.getThreeItems} className='app-homepage__button'>
            Refresh images
        </Button>
        </div>
      </div>
    );
  }
}
