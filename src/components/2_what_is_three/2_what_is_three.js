import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import addWireframePlane from '../../3D/plane';
import Card from '../Card/Card';

class WhatIsThree extends Component {
  componentDidMount() {
    addWireframePlane();
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>What is three.js?</h2>
            <ul>
              <li><a href='https://github.com/mrdoob/three.js' target='_blank'>github.com/mrdoob/three.js</a></li>
              <li>an easy to use 3D library</li>
              <li>great abstraction over raw WebGL</li>
              <li>provides &lt;canvas&gt;, &lt;svg&gt;, CSS3D and (most importantly) WebGL renderers</li>
              <li>updated frequently</li>
              <li>
                active community
                <ul>
                  <li><a href='https://discourse.threejs.org/' target='_blank'>discourse</a></li>
                  <li><a href='https://stackoverflow.com/questions/tagged/three.js' target='_blank'>Stack Overflow</a></li>
                  <li><a href='https://threejs.org/docs/index.html#manual/introduction/Creating-a-scene' target='_blank'>documentation</a></li>
                  <li><a href='https://threejs.org/examples/' target='_blank'>examples</a></li>
                </ul>
              </li>
            </ul>
          </Card>
        </div>
    );
  }
}

export default WhatIsThree;
