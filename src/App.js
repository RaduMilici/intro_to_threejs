import React, { Component } from 'react';
import Welcome from './components/1_welcome/1_welcome';
import WhatIsThree from './components/2_what_is_three/2_what_is_three';
import Renderer from './components/3_renderer/3_renderer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 2,
      slides: [<Welcome/>, <WhatIsThree/>, <Renderer/>],
    };
    this.addKeyPress();
    /*
    setInterval(() => {
      const currentIndex = this.state.currentIndex === 1 ? 0 : 1;
      this.setState({ currentIndex });
    }, 5000);
    */
  }

  addKeyPress() {
    document.onkeydown = (e) => {
      let currentIndex = this.state.currentIndex;
      switch (e.keyCode) {
        case 37:
          currentIndex--;
          break;
        case 39:
          currentIndex++;
          break;
      }
      this.changeSlide(currentIndex);
    };
  }

  changeSlide(currentIndex) {
    if (currentIndex >= 0 && currentIndex < this.state.slides.length) {
      this.setState({ currentIndex });
    }
  }

  activeSlide() {
    return this.state.slides[this.state.currentIndex];
  }

  keyDownHandler(e) {
    console.log(e.keyCode);
  }

  render() {
    return (
        <div onKeyDown={(e) => { console.log(e) }}>
          { this.activeSlide() }
        </div>
    );

  }
}

export default App;
