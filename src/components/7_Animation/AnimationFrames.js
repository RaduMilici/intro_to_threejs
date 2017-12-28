import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';
import animation_frames from '../../../src/img/animation_frames.gif';
import animation_frames_shark from '../../../src/img/animation_frames_shark.gif';

class AnimationFrames extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{'max-width': '1000px'}}>
              <h2>Animation frames</h2>
              <p>Animation is the process of making the illusion of motion and the illusion of change by means of the rapid succession of sequential images that minimally differ from each other.</p>
              <p>The illusion—as in motion pictures in general—is thought to rely on the <a href='https://en.wikipedia.org/wiki/Phi_phenomenon'>phi phenomenon</a> and <a
                  href='https://en.wikipedia.org/wiki/Beta_movement'>beta movement</a>, but the exact causes are still unclear.</p>
              <p style={{'font-weight': 'bold'}}>The static images do not physically change but give the appearance of motion because of being rapidly changed faster than the eye can see.</p>
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
