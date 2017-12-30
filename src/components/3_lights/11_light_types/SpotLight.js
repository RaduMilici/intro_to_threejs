import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D } from '../../../3D';
import { SphereBufferGeometry, MeshPhongMaterial, Mesh, DirectionalLightHelper } from 'three';
import earth_space from '../../../img/earth_space.jpg';
import * as THREE from 'three';
import OrbitControlsImport from 'three-orbit-controls';

const OrbitControls = OrbitControlsImport(THREE);

class _DirectionalLight extends Component {
  constructor() {
    super();
    this.state = {
      editorArgs: {
        'scene': null,
      },
      code:
`const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(-10, 10, 0);
scene.add(directionalLight);

return directionalLight;
`
    }
  }

  addControls() {
    this.controls = new OrbitControls(this.app3d.camera, this.app3d.container);
    this.app3d.updater.add(this.controls.update);
  }

  addObject() {
    const geometry = new SphereBufferGeometry( 10, 16, 16 );
    const material = new MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });
    const mesh = new Mesh( geometry, material );
    this.app3d.updater.add(() => { mesh.rotation.y += 0.01; });
    return mesh;
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 30);
    this.app3d.scene.add(this.addObject());
    const editorArgs = { scene: this.app3d.scene };
    this.setState({ editorArgs }, () => {
      this.codeView.onChange(this.state.code);
    });
    this.addControls();
    this.app3d.updater.start();
  }

  beforeChange = () => {
    this.app3d.disposeHierarchy();
    this.app3d.scene.add(this.addObject());
  }

  onChange = directionalLight => {
    const helper = new DirectionalLightHelper( directionalLight, 10 );
    this.app3d.scene.add(helper);
  }

  render() {
    return (
        <div>
          <img width='550' height='250' style={{'position': 'absolute'}} src={earth_space}/>
          <CodeView
              ref={instance => { this.codeView = instance; }}
              code={this.state.code}
              onChange={this.onChange}
              beforeChange={this.beforeChange}
              width='550'
              height='250'
              args={this.state.editorArgs}
          />
        </div>
    );
  }
}

export default _DirectionalLight;
