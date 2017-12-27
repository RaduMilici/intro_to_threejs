import React, { Component } from 'react';
import { App3D } from '../../3D';
import * as THREE from 'three';
import OrbitControlsImport from 'three-orbit-controls';
import SceneView from '../SceneView/SceneView';
import WireframePlane from '../../3D/WireframePlane';
import Card from '../Card/Card';
import Helpers from './Helpers';
import CodeView from '../CodeView/CodeView';
import 'brace/mode/javascript';
import 'brace/theme/github';

const OrbitControls = OrbitControlsImport(THREE);

class WhatIsThree extends Component {
  constructor() {
    super();
    this.helpers = new Helpers();
    this.state = {
      code:
`const fov = 30;
const aspect = 500 / 500;
const near = 1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 2, 3);

return camera;
`
    };
  }

  componentDidMount() {
    this.addBackground();
    this.addDemoView();
  }

  addBackground() {
    const app3d = new App3D('#WebGL');
    const wireframePlane = new WireframePlane(app3d.updater);
    app3d.scene.add(wireframePlane);
    app3d.camera.position.z = 50;
    app3d.updater.start();
  }

  addDemoView() {
    const app3d = new App3D('.code-view');
    app3d.camera.position.set(5, 5, 5);
    app3d.camera.lookAt(0, 0, 0);
    app3d.updater.start();
    app3d.scene.add(this.helpers);
    const controls = new OrbitControls(app3d.camera, app3d.container);
    console.log(controls);
    //console.log(controls);
  }

  onCodeChange = camera => { this.helpers.setCamera(camera); }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Camera</h2>
            <CodeView
                code={this.state.code}
                width='550'
                onChange={this.onCodeChange}
            />
          </Card>
        </div>
    );
  }
}

export default WhatIsThree;
