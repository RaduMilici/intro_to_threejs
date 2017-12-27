import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import addWireframePlane from '../../3D/plane';
import Card from '../Card/Card';

class WhatIsThree extends Component {
  componentDidMount() {
    addWireframePlane();
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Renderer</h2>
          </Card>
        </div>
    );
  }
}

export default WhatIsThree;
