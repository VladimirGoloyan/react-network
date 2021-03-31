import { Button } from "@material-ui/core";
import React, { Component } from "react";
import pictures from "../../data-mockup/pricture-url-mockup";

import Image from "../../components/Image/Image";

import "./Homepage.scss";

export default class Homepage extends Component {
  state = {
    displayItems: null,
  };

  getThreeItems = () => {
    let a = 0;
    let b = 0;
    let c = 0;

    while (a === b || b === c || a === c) {
      a = Math.floor(Math.random() * 15);
      b = Math.floor(Math.random() * 15);
      c = Math.floor(Math.random() * 15);
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
              return (
                <Image
                  className='app-homepage__image'
                  key={idx}
                  src={pictures[el].url}
                  alt={pictures[el].alt}
                />
              );
            })}
        </div>
        <div className="app-homepage__button-container">
          <Button onClick={this.getThreeItems} className="app-homepage__button">
            Refresh images
          </Button>
        </div>
      </div>
    );
  }
}
