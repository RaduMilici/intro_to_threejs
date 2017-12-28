import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';

class GpuVsCpu extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>The wizardry of hardware acceleration</h2>
            <div style={{'max-width': '1200px'}}>
              <p>Architecturally, the <strong>CPU</strong> is composed of just few cores that can handle a few software threads at a time.</p>
              <p>In contrast, a <strong>GPU</strong> is composed of hundreds of cores that can handle thousands of threads simultaneously.</p>
            </div>
            <div style={{'text-align': 'center'}}>
              <iframe width="1000" height="500" src="https://www.youtube.com/embed/-P28LKWTzrI" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
            </div>
          </Card>
        </div>
    );
  }
}

export default GpuVsCpu;
