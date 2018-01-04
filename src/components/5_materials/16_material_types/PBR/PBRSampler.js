import React, { Component } from 'react';
import CodeView from '../../../CodeView/CodeView';
import {App3D, util} from '../../../../3D/index';
import { PointLight, AmbientLight, CubeTextureLoader } from 'three';
import HDRCubeTextureLoader from '../../../../lib/HDRCubeTextureLoader';
import RGBELoader from '../../../../lib/RGBELoader';
import PMREMGenerator from '../../../../lib/PMREMGenerator';
import PMREMCubeUVPacker from '../../../../lib/PMREMCubeUVPacker';
import loadTextureCube from './texture_cube';
import loadMesh from './obj_loader';

class MaterialSampler extends Component {
  constructor() {
    super();
    this.textureCube = loadTextureCube();
    loadMesh(mesh => {
      this.mesh = mesh;
      this.app3d.scene.add(this.mesh);
    });
    console.log(this.mesh);
    this.state = {
      editorArgs: {
        scene: null,
      },
      code: `return new THREE.Object3d();`
    }
  }

  addLight() {
    const light = new PointLight(0xffffff, 2);
    light.position.set(0, 0, 3.5);
    const ambient = new AmbientLight(0x404040);
    this.app3d.scene.add(light, ambient);
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 6);
    this.app3d.updater.start();
    this.app3d.scene.background = this.textureCube;
    util.addControls(this.app3d);
    const editorArgs = { scene: this.app3d.scene };
    this.setState({ editorArgs }, () => {
      this.codeView.onChange(this.state.code);
    });
  }

  codeHasChanged = (s, code) => {
    this.app3d.disposeHierarchy();
    this.app3d.updater.clear();
    this.addLight();
    const mesh = this.codeView.execute(code);
    this.app3d.updater.add((timestamp, delta) => {
      mesh.rotation.y += 0.5 * delta;
    });
    this.props.callback(this.app3d.scene, mesh);
  }

  render() {
    return (
        <div>
          <img style={{position: 'absolute', 'objectFit': 'cover'}} width='500' height='250'  src={this.props.imgUrl}/>
          <CodeView
              ref={instance => { this.codeView = instance; }}
              code={this.state.code}
              args={this.state.editorArgs}
              height='250'
              onChange={this.codeHasChanged}
          />
        </div>
    );
  }
}

MaterialSampler.defaultProps = {
  code: '',
  imgUrl: '',
  callback: () => {},
};

export default MaterialSampler;
