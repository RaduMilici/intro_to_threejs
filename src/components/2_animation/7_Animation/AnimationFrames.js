import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import animation_frames from '../../../img/animation_frames.gif';
import animation_frames_shark from '../../../img/animation_frames_shark.gif';

class AnimationFrames extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{'max-width': '1000px'}}>
              <h2>Animation frames</h2>
              <p>Animation is the process of making the illusion of motion by means of the rapid succession of sequential images that minimally differ from each other.</p>
              <p>The static images do not physically change but give the appearance of motion because of being rapidly changed <strong>faster than the eye can see.</strong></p>
              <img width='500px' src={animation_frames}/>
              <img width='500px' height='300px' src={animation_frames_shark}/>
              <span className='copyright-info'>via <a href='https://giphy.com/gifs/left-shark-XjBM2R3QfJYIw'>giphy</a></span>
            </div>
          </Card>
        </div>
    );
  }
}

export default AnimationFrames;
