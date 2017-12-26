import React, { Component } from 'react';
import './SceneView.css';
import { createScene, updater } from '../../3D';

class SceneView extends Component {
  componentDidMount() {
    createScene();
    updater.start();
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
