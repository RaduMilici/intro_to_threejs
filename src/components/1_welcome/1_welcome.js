import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import addText from './text';
import addWireframePlane from '../../3D/plane';
import makeParticles from './particles';

class Welcome extends Component {
  componentDidMount() {
    addText();
    addWireframePlane();
    makeParticles();
  }

  render() {
    return <SceneView/>;
  }
}

export default Welcome;
