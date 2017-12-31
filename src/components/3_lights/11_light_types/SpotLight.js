import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D } from '../../../3D';
import { TorusKnotBufferGeometry, MeshPhongMaterial, Mesh, SpotLightHelper,
  PlaneBufferGeometry } from 'three';
import spotlight from '../../../img/spotlight.jpg';
import * as THREE from 'three';
import DatGui, { DatBoolean, DatButton, DatNumber, DatString, DatColor, DatFolder } from 'react-dat-gui';
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
        color: '0xffffff',
        intensity: 1,
        distance: 30,
        angle: 0.45,
        package: 'react-dat-gui',
        power: 9000,
        isAwesome: true,
      },
      code:
`// light
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-8, 12, 0);
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
    const geometry = new PlaneBufferGeometry( 50, 50 );
    const material = new MeshPhongMaterial({ color: 0xffff00, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x += Math.PI / 2;
    return plane;
  }

  makeObjects() {
    const plane = this.makePlane();
    const geometry = new TorusKnotBufferGeometry( 2, 0.3, 100, 16 );
    const material = new MeshPhongMaterial({ color: 0x0000ff, shininess: 100 });
    const torusKnot = new Mesh( geometry, material );
    torusKnot.position.y = 3;
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
    this.app3d.camera.position.set(0, 15, 15);
    this.app3d.camera.lookAt(0, 0, 0);
    const objects = this.makeObjects();
    this.setEditorArgs(objects, this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    this.addControls();
    this.app3d.updater.start();
  }

  beforeChange = () => {
    this.app3d.disposeHierarchy();
  }

  onChange = (spotLight, code) => {
    this.app3d.disposeHierarchy();
    const objects = this.makeObjects();
    this.app3d.scene.add(objects.plane, objects.torusKnot);
    this.setEditorArgs(objects, code, () => {
      this.spotLight = this.codeView.execute(code);
      this.spotLightHelper = new SpotLightHelper(this.spotLight);
      this.app3d.scene.add(this.spotLightHelper);
      this.updateLight(this.state.uiData);
    });
  }

  updateLight = uiData => {
    console.log(uiData.color)
    this.spotLight.color.setHex( uiData.color );
    this.spotLight.intensity = uiData.intensity;
    this.spotLight.distance = uiData.distance;
    this.spotLight.angle = uiData.angle;
    this.spotLightHelper.update();
    this.setState({ uiData });
  }

  render() {
    return (
        <div style={{'position': 'relative'}}>
          <img width='550' height='250' style={{'position': 'absolute'}} src={spotlight}/>
          <DatGui style={{'left': '275px'}} data={this.state.uiData} onUpdate={this.updateLight} className='demo-dat-gui'>
            <DatFolder title='settings' children={[
              <DatColor path='color' label='color' />,
              <DatNumber path='intensity' label='intensity' min={0} max={3} step={0.1} />,
              <DatNumber path='distance' label='distance' min={0} max={50} step={0.1} />,
              <DatNumber path='angle' label='angle' min={0} max={1} step={0.01} />,
              <DatColor path='feelsLike' label='Feels Like' />,
            ]}/>
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
