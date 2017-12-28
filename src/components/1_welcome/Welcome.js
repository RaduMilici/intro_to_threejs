import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import IntroText from './IntroText';
import WireframePlane from '../../3D/WireframePlane';
import Particles from './Particles';
import { App3D } from '../../3D';

class Welcome extends Component {
  componentDidMount() {
    this.app3d = new App3D('#WebGL');
    const introText = new IntroText(this.app3d.updater);
    const wireframePlane = new WireframePlane(this.app3d.updater);
    const particles = new Particles(this.app3d.updater);
    this.app3d.scene.add(introText, wireframePlane, particles);

    this.app3d.camera.position.z = 50;
    this.app3d.updater.start();
  }

  componentWillUnmount() {
    this.app3d.destroyScene();
  }

  render() {
    return <SceneView background={false}/>;
  }
}

export default Welcome;
