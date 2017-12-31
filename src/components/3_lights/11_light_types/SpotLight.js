import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D } from '../../../3D';
import { TorusKnotBufferGeometry, MeshPhongMaterial, Mesh, SpotLightHelper,
  PlaneBufferGeometry } from 'three';
import spotlight from '../../../img/spotlight.jpg';
import * as THREE from 'three';
import DatGui, { DatBoolean, DatButton, DatNumber, DatString, DatColor } from 'react-dat-gui';
import OrbitControlsImport from 'three-orbit-controls';
import 'react-dat-gui/build/react-dat-gui.css';

const OrbitControls = OrbitControlsImport(THREE);

class _DirectionalLight extends Component {
  constructor() {
    super();
    this.state = {
      editorArgs: {
        scene: null,
        renderer: null,
        torusKnot: null,
        plane: null,
      },
      uiData: {
        package: 'react-dat-gui',
        power: 9000,
        isAwesome: true,
        feelsLike: '#2FA1D6',
      },
      code:
`// light
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-3, 7, 0);
// shadow
renderer.shadowMap.enabled = true;
spotLight.castShadow = true;
torusKnot.castShadow = true;
plane.receiveShadow = true;

scene.add(spotLight);
return spotLight;
`
    }
  }

  addControls() {
    this.controls = new OrbitControls(this.app3d.camera, this.app3d.container);
    this.app3d.updater.add(this.controls.update);
  }

  makePlane() {
    const geometry = new PlaneBufferGeometry( 20, 20 );
    const material = new MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x += Math.PI / 2;
    plane.position.y = -5;
    return plane;
  }

  makeObjects() {
    const plane = this.makePlane();
    const geometry = new TorusKnotBufferGeometry( 3, 0.5, 100, 16 );
    const material = new MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });
    const torusKnot = new Mesh( geometry, material );
    plane.add(torusKnot);
    this.app3d.updater.add(() => {
      torusKnot.rotation.y += 0.01;
      torusKnot.rotation.x += 0.01;
    });
    return { plane, torusKnot };
  }

  setEditorArgs(objects, code, callback = () => {}) {
    const editorArgs = {
      scene: this.app3d.scene,
      renderer: this.app3d.renderer,
      torusKnot: objects.torusKnot,
      plane: objects.plane,
    };
    this.setState({ editorArgs, code }, callback);
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 5, 15);
    this.app3d.camera.lookAt(0, 0, 0);
    const objects = this.makeObjects();
    this.setEditorArgs(objects, this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    this.addControls();
    this.app3d.updater.start();
  }

  onChange = (spotLight, code) => {
    this.app3d.disposeHierarchy();
    const objects = this.makeObjects();
    this.app3d.scene.add(objects.plane, objects.torusKnot);
    const helper = new SpotLightHelper(spotLight);
    this.app3d.scene.add(helper);
    this.setEditorArgs(objects, code, () => { this.codeView.execute(code) });
  }

  update = uiData => {
    console.log(uiData)
    this.setState({ uiData });
  }

  render() {
    return (
        <div>
          <img width='550' height='250' style={{'position': 'absolute'}} src={spotlight}/>
          <DatGui data={this.state.uiData} onUpdate={this.update}>
            <DatNumber path='power' label='Power' min={9000} max={9999} step={1} />
            <DatBoolean path='isAwesome' label='Awesome?' />
            <DatColor path='feelsLike' label='Feels Like' />
          </DatGui>
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
