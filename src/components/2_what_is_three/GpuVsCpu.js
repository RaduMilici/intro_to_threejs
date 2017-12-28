import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';

class GpuVsCpu extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>1. The basics of 3D rendering</h2>
            <iframe width="1000" height="500" src="https://www.youtube.com/embed/-P28LKWTzrI" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
          </Card>
        </div>
    );
  }
}

export default GpuVsCpu;
