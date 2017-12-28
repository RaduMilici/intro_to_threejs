import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';

class Basics extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>1. The basics of 3D rendering</h2>
            <div style={{'color': 'darkgray'}}>
              <q style={{'font-style': 'italic'}}>Big things have small beginnings.</q>
              <br/>
              <p style={{'float': 'right', 'margin': '0'}}>Mr. Dryden</p>
            </div>
          </Card>
        </div>
    );
  }
}

export default Basics;
