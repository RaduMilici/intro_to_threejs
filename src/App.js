import React, { Component } from 'react';
import { Welcome, WhatIsThree, Renderer, Camera, Scene } from './components';

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 4,
      slides: [<Welcome/>, <WhatIsThree/>, <Renderer/>, <Camera/>, <Scene/>],
    };
    this.addKeyPress();
    // <iframe id="product-video" class="video-iframe" width="100%" height="800" scrolling="auto" border="0" src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/B1gbbquwb.mp4&amp;is_stereo=false&amp;start_yaw=90" data-src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/B1gbbquwb.mp4&amp;is_stereo=false&amp;start_yaw=90" allowfullscreen=""></iframe>
    // <iframe id="product-video" class="video-iframe" width="100%" height="800" scrolling="auto" border="0" src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/SJqciFb_W.mp4&amp;is_stereo=false&amp;start_yaw=90" data-src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/SJqciFb_W.mp4&amp;is_stereo=false&amp;start_yaw=90" allowfullscreen=""></iframe>
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
      if(e.keyCode === 37) {
        currentIndex--;
      }
      else if (e.keyCode === 39) {
        currentIndex++;
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
    return this.activeSlide();

  }
}

export default App;
