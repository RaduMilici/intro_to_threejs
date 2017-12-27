import React, { Component } from 'react';
import { App3D } from '../../3D';
import SceneView from '../SceneView/SceneView';
import WireframePlane from '../../3D/WireframePlane';
import Card from '../Card/Card';
import CodeView from '../CodeView/CodeView';
import 'brace/mode/javascript';
import 'brace/theme/github';

class Renderer extends Component {
  constructor() {
    super();
    this.state = {
      code:
`const container = document.querySelector('.code-view');
const renderer = new THREE.WebGLRenderer();
container.appendChild(renderer.domElement);

renderer.setSize(500, 500);
renderer.setClearColor(0xbada55, 1);
renderer.clear();
`
    };
  }

  componentDidMount() {
    const app3d = new App3D('#WebGL');
    const wireframePlane = new WireframePlane(app3d.updater);
    app3d.scene.add(wireframePlane);
    app3d.camera.position.z = 50;
    app3d.updater.start();
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Renderer</h2>
            <CodeView code={this.state.code}/>
          </Card>
        </div>
    );
  }
}

export default Renderer;
