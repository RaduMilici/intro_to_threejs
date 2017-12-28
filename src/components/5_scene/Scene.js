import React, { Component } from 'react';
import { App3D } from '../../3D';
import { Scene } from 'three';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';
import CodeView from '../CodeView/CodeView';
import * as THREE from 'three';
import OrbitControlsImport from 'three-orbit-controls';
const OrbitControls = OrbitControlsImport(THREE);

class _Scene extends Component {
  constructor() {
    super();
    this.scene = new Scene();
    this.state = {
      code:
`const scene = new THREE.Scene();

const geometry = new THREE.CubeGeometry(5, 5, 5);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
return cube;
`,
    }
  }

  componentDidMount() {
    this.addDemoView();
    this.addControls();
  }

  addControls() {
    this.controls = new OrbitControls(this.app3d.camera, this.app3d.container);
    this.controls.enableKeys = false;
    this.controls.enablePan = false;
  }

  addDemoView() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(5, 4, 5);
    this.app3d.camera.lookAt(0, 0, 0);
    this.app3d.scene.add(this.scene);
    this.app3d.updater.start();
  }


  onCodeChange = cube => {
    if(this.app3d) {
      this.app3d.disposeHierarchy(this.scene);
    }
    this.scene.add(cube);
  }

  render() {
    return (
      <div>
        <SceneView/>
        <Card>
          <h2>Scene and children</h2>
          <CodeView
              width='520'
              onChange={this.onCodeChange}
              code={this.state.code}
          />
        </Card>
      </div>
    );
  }
}

export default _Scene;
