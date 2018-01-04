import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D, util } from '../../../3D';
import DatGui, { DatNumber, DatFolder } from 'react-dat-gui';
import spotlight from '../../../img/light_bub.jpg';
import { BackSide, MeshPhongMaterial, MeshLambertMaterial, PointLightHelper, Geometry, Mesh, AmbientLight } from 'three';

class PointLight extends Component {
  constructor() {
    super();
    this.state = {
      editorArgs: {
        scene: null,
        renderer: null,
        room: null,
        orbiter: null,
      },
      code:
`// light
const pointLight = new THREE.PointLight(0xFCD440, 1, 18);
// shadow
renderer.shadowMap.enabled = true;
pointLight.castShadow = true;
orbiter.castShadow = true;
room.receiveShadow = true;

scene.add(pointLight);
return pointLight;
`
    };
  }


  makeRoom() {
    const box = util.makeBox(20, 20, 20);
    box.material = new MeshPhongMaterial({ side: BackSide, shininess: 0 });
    return box;
  }

  makeOrbiter() {
    const side = 2;
    const distance = 5;
    let mergedGeom = new Geometry();
    const positions = [
      { x: 0, y: distance, z: 0 },
      { x: distance, y: 0, z: 0 },
      { x: 0, y: -distance, z: 0 },
      { x: -distance, y: 0, z: 0 },
      { x: 0, y: 0, z: distance },
      { x: 0, y: 0, z: -distance },
    ];
    positions.forEach(p => {
      const boxGeom = util.makeBoxGeom(side, side, side);
      boxGeom.translate(p.x, p.y, p.z);
      mergedGeom.merge(boxGeom);
    });
    const orbiter = new Mesh(mergedGeom, new MeshLambertMaterial({ color: 0x52d3fa }));
    this.app3d.updater.add((timestamp, delta) => {
      orbiter.rotation.x += 1 * delta;
      orbiter.rotation.y += 1 * delta;
      orbiter.rotation.z += 1 * delta;
    });
    return orbiter;
  }

  makeEnvironment() {
    const room = this.makeRoom();
    const orbiter = this.makeOrbiter();
    return { room, orbiter };
  }

  setEditorArgs({ room, orbiter }, code, callback = () => {}) {
    const editorArgs = {
      scene: this.app3d.scene,
      renderer: this.app3d.renderer,
      room,
      orbiter,
    };
    this.setState({ editorArgs, code }, callback);
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 19);
    this.app3d.camera.lookAt(0, 0, 0);
    this.app3d.updater.start();
    this.setEditorArgs(this.makeEnvironment(), this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
  }

  onCodeChange = (pointLight, code) => {
    this.app3d.disposeHierarchy();
    const pointLightHelper = new PointLightHelper(pointLight, 1, 0x000000);
    const ambient = new AmbientLight(0x333333);
    const { room, orbiter } = this.makeEnvironment();
    this.app3d.scene.add(pointLight, room, orbiter, pointLightHelper, ambient);
    this.setEditorArgs({ room, orbiter }, code, () => { this.codeView.execute(code) });
  }

  render() {
    return(
        <div>
          <img width='550' height='250' src={spotlight} style={{'position': 'absolute'}}/>
          <CodeView
            code={this.state.code}
            ref={instance => { this.codeView = instance; }}
            onChange={this.onCodeChange}
            width='550'
            height='250'
            args={this.state.editorArgs}
          />
        </div>
    );
  }
}

export default PointLight;
