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
        'earth': null,
        'moon': null,
        'renderer': null,
      },
      code:
`// light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
directionalLight.position.set(-10, 5, 0);
// shadow
renderer.shadowMap.enabled = true;
directionalLight.castShadow = true;
earth.castShadow = true;
moon.receiveShadow = true;

scene.add(directionalLight);
return directionalLight;
`
    }
  }

  addControls() {
    this.controls = new OrbitControls(this.app3d.camera, this.app3d.container);
    this.app3d.updater.add(this.controls.update);
  }

  makeObjects() {
    const earthGeom = new SphereBufferGeometry( 5, 8, 8 );
    const earthMat = new MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });
    const earth = new Mesh( earthGeom, earthMat );

    const moonGeom = new SphereBufferGeometry( 1, 8, 8 );
    const moonMat = new MeshPhongMaterial({ color: 0xaaaaaa });
    const moon = new Mesh(moonGeom, moonMat);
    moon.position.x = 8;
    earth.add(moon);

    this.app3d.updater.add(() => { earth.rotation.y += 0.03; });

    return { earth, moon };
  }

  setEditorArgs(objects, code, callback = () => {}) {
    const editorArgs = {
      scene: this.app3d.scene,
      renderer: this.app3d.renderer,
      earth: objects.earth,
      moon: objects.moon,
    };
    this.setState({ editorArgs, code }, callback);
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 15);
    const objects = this.makeObjects();
    this.app3d.scene.add(objects.earth);
    this.setEditorArgs(objects, this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    this.addControls();
    this.app3d.updater.start();
  }

  onChange = (directionalLight, code) => {
    this.app3d.disposeHierarchy();
    this.app3d.updater.clear();
    const helper = new DirectionalLightHelper( directionalLight, 5 );
    const objects = this.makeObjects();
    this.app3d.scene.add(objects.earth, helper);
    this.setEditorArgs(objects, code, () => { this.codeView.execute(code) });
  }

  render() {
    return (
        <div>
          <img width='550' height='250' style={{'position': 'absolute'}} src={earth_space}/>
          <CodeView
              ref={instance => {this.codeView = instance;}}
              code={this.state.code}
              onChange={this.onChange}
              width='550'
              height='250'
              args={this.state.editorArgs}
          />
        </div>
    );
  }
}

export default _DirectionalLight;
