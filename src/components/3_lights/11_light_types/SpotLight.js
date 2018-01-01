import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D, util } from '../../../3D';
import DatGui, { DatNumber, DatFolder } from 'react-dat-gui';
import { MeshPhongMaterial, SpotLightHelper } from 'three';
import spotlight from '../../../img/spotlight.jpg';
import 'react-dat-gui/build/react-dat-gui.css';

class DirectionalLight extends Component {
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
        intensity: 2,
        distance: 30,
        angle: 0.45,
        penumbra: 0.5,
      },
      code:
`// light
const color = 0xffffff;
const intensity = 2;
const spotLight = new THREE.SpotLight(color, intensity);
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

  makeObjects() {
    const plane = util.makePlane(150, 150);
    plane.material = new MeshPhongMaterial({ color: 0x2C5B61 });
    plane.rotation.x -= Math.PI / 2;

    const torusKnot = util.makeTorusKnot(2, 0.3, 100, 16);
    torusKnot.material = new MeshPhongMaterial({ color: 0x52d3fa, shininess: 100 });
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
    this.app3d.camera.position.set(0, 17, 12);
    this.app3d.camera.lookAt(0, 0, 0);
    const objects = this.makeObjects();
    this.setEditorArgs(objects, this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    util.addControls(this.app3d);
    this.app3d.updater.start();
  }

  onCodeChange = (spotLight, code) => {
    this.app3d.disposeHierarchy();
    const objects = this.makeObjects();
    this.app3d.scene.add(objects.plane, objects.torusKnot);
    this.setEditorArgs(objects, code, () => {
      this.spotLight = this.codeView.execute(code);
      this.spotLightHelper = new SpotLightHelper(this.spotLight);
      this.app3d.scene.add(this.spotLightHelper);
      this.updateLightSettings(this.state.uiData);
    });
  }

  updateLightSettings = uiData => {
    Object.assign(this.spotLight, uiData);
    this.spotLightHelper.update();
    this.setState({ uiData });
  }

  render() {
    return (
        <div style={{'position': 'relative'}}>
          <img width='550' height='250' style={{'position': 'absolute'}} src={spotlight}/>
          <DatGui style={{'left': '275px'}} data={this.state.uiData} onUpdate={this.updateLightSettings} className='demo-dat-gui'>
            <DatFolder title='settings' children={[
              <DatNumber path='intensity' label='intensity' min={0} max={5} step={0.1} />,
              <DatNumber path='distance' label='distance' min={0.1} max={50} step={0.1} />,
              <DatNumber path='angle' label='angle' min={0.01} max={1} step={0.01} />,
              <DatNumber path='penumbra' label='penumbra' min={0} max={1} step={0.001} />,
            ]}/>
          </DatGui>
          <CodeView
              ref={instance => { this.codeView = instance; }}
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

export default DirectionalLight;
