import React, { Component } from 'react';
import './SceneView.css';
import {App3D} from '../../3D';
import WireframePlane from '../../3D/WireframePlane';

class SceneView extends Component {
  constructor() {
    super();
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

export default SceneView;
