import React, { Component } from 'react';
import * as slideClasses from './components';

class App extends Component {
  constructor() {
    super();
    const slides = [];
    Object.keys(slideClasses).forEach(slideName => {
      const Slide = slideClasses[slideName];
      slides.push(<Slide/>);
    });
    const currentIndex = 0;//slides.length - 1;
    this.state = { slides, currentIndex };
    this.addKeyPress();
    // <iframe id="product-video" class="video-iframe" width="100%" height="800" scrolling="auto" border="0" src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/B1gbbquwb.mp4&amp;is_stereo=false&amp;start_yaw=90" data-src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/B1gbbquwb.mp4&amp;is_stereo=false&amp;start_yaw=90" allowfullscreen=""></iframe>
    // <iframe id="product-video" class="video-iframe" width="100%" height="800" scrolling="auto" border="0" src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/SJqciFb_W.mp4&amp;is_stereo=false&amp;start_yaw=90" data-src="https://vr-player.vrecards.com/index.html?video=https://scenes.vrecards.com/renderer_v2/rendered/SJqciFb_W.mp4&amp;is_stereo=false&amp;start_yaw=90" allowfullscreen=""></iframe>
  }

  addKeyPress() {
    document.onkeydown = e => {
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

  makeSlideOptions() {
    return Object.keys(slideClasses).map((name, i) => {
      return <option key={name} value={i}>{`${i + 1}. ${name}`}</option>;
    });
  }

  render() {
    return (
        <div>
        <select
            className='slide-select'
            onChange={e => this.changeSlide(e.target.value)}
            value={this.state.currentIndex}
        >
          {this.makeSlideOptions()}
        </select>
          {this.state.slides[this.state.currentIndex]}
        </div>
    );
  }
}

export default App;
