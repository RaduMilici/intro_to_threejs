import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';
import Quote from '../Card/Quote/Quote';

class Basics extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>1. The basics of 3D rendering</h2>
            <Quote
                text='Big things have small beginnings.'
                author='Mr. Dryden'
            />
          </Card>
        </div>
    );
  }
}

export default Basics;
