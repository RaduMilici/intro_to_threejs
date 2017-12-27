import React, { Component } from 'react';
import './SceneView.css';
import { createScene, destroyScene, updater } from '../../3D';

class SceneView extends Component {
  componentDidMount() {
    createScene();
    updater.start();
  }

  componentWillUnmount() {
    updater.stop();
    updater.clear();
    destroyScene();
  }

  render() {
    return (
      <div id='WebGL'>
        { this.props.children }
      </div>
    );
  }
}

export default SceneView;
