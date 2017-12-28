import React, { Component } from 'react';
import './SceneView.css';
import {App3D} from '../../3D';
import WireframePlane from '../../3D/WireframePlane';

class SceneView extends Component {
  constructor() {
    super();
    this.state = { app3d: null };
  }

  componentDidMount() {
    if(!this.props.background) return;
    this.app3d = new App3D('#WebGL');
    const wireframePlane = new WireframePlane(this.app3d.updater);
    this.app3d.scene.add(wireframePlane);
    this.app3d.camera.position.z = 50;
    this.app3d.updater.start();
  }

  componentWillUnmount() {
    if(this.props.background) {
      this.app3d.destroyScene();
    }
  }

  render() {
    return (
        <div>
          <div id='WebGL'>
            { this.props.children }
          </div>
        </div>
    );
  }
}

SceneView.defaultProps = {
  background: true,
};

export default SceneView;
