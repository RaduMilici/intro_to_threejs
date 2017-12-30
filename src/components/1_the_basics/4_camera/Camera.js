import React, { Component } from 'react';
import { App3D } from '../../../3D/index';
import * as THREE from 'three';
import OrbitControlsImport from 'three-orbit-controls';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import Helpers from '../../../3D/Helpers';
import CodeView from '../../CodeView/CodeView';

const OrbitControls = OrbitControlsImport(THREE);

class Camera extends Component {
  constructor() {
    super();
    this.helpers = new Helpers();
    this.helpers.gridHelper.visible = false;
    this.helpers.axesHelper.visible = false;
    this.helpers.position.z = 2.5;
    this.state = {
      code:
`const fov = 30;
const aspect = 16 / 9;
const near = 1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

return camera;
`
    };
  }

  componentDidMount() {
    this.addDemoView();
    this.addControls();
  }

  addDemoView() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(5, 4, 5);
    this.app3d.camera.lookAt(0, 0, 0);
    this.app3d.updater.start();
    this.app3d.scene.add(this.helpers);
  }

  addControls() {
    this.controls = new OrbitControls(this.app3d.camera, this.app3d.container);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.3;
    this.controls.enableKeys = false;
    this.controls.enablePan = false;
    this.app3d.updater.add(this.updateControls.bind(this));
  }

  updateControls() { this.controls.update(); }

  stopRotate = () => {
    this.app3d.updater.remove(this.updateControls.bind(this));
  }

  onCodeChange = camera => { this.helpers.setCamera(camera); }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Camera</h2>
            <CodeView
                onClick={this.stopRotate}
                code={this.state.code}
                width='550'
                onChange={this.onCodeChange}
            />
          </Card>
        </div>
    );
  }
}

export default Camera;
