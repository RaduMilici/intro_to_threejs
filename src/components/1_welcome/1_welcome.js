import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import { camera } from '../../3D/index';
import addText from './text';
import addPlane from './plane';
import makeParticles from './particles';

class Welcome extends Component {
  componentDidMount() {
    addText();
    addPlane();
    makeParticles();
    camera.position.z = 50;
  }

  render() {
    return <SceneView/>;
  }
}

export default Welcome;
