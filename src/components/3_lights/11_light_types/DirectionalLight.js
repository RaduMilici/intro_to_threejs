import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D, util } from '../../../3D';
import { MeshPhongMaterial, DirectionalLightHelper } from 'three';
import earth_space from '../../../img/earth_space.jpg';

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
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
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

  makeObjects() {
    const earth = util.makeSphere(5, 16, 16);
    earth.material = new MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });

    const moon = util.makeSphere(1, 8, 8);
    moon.material = new MeshPhongMaterial({ color: 0xaaaaaa });
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
    this.app3d.camera.position.set(0, 0, 20);
    const objects = this.makeObjects();
    this.app3d.scene.add(objects.earth);
    this.setEditorArgs(objects, this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    util.addControls(this.app3d);
    this.app3d.updater.start();
  }

  onCodeChange = (directionalLight, code) => {
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
              onChange={this.onCodeChange}
              width='550'
              height='250'
              args={this.state.editorArgs}
          />
        </div>
    );
  }
}

export default _DirectionalLight;
