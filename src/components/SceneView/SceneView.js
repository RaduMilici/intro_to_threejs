import React, { Component } from 'react';
import './SceneView.css';

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
