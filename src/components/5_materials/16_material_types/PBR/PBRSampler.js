import React, { Component } from 'react';
import CodeView from '../../../CodeView/CodeView';
import {App3D, util} from '../../../../3D/index';
import { Mesh, HemisphereLight } from 'three';
import loadTextureCube from './texture_cube';
import { loadMesh, loadMaterial } from './obj_loader';

class MaterialSampler extends Component {
  constructor() {
    super();
    this.textureCube = loadTextureCube();
    loadMesh(mesh => {
      this.mesh = mesh;
      this.app3d.scene.add(this.mesh);
      const material = loadMaterial(this.app3d.renderer);
      mesh.position.z = 0.5;
      mesh.traverse(child => {
        if ( child instanceof Mesh ) {
          child.material = material;
        }
      });
    });
    this.state = {
      editorArgs: {
        scene: null,
      },
      code: `return new THREE.Object3d();`
    }
  }

  addLight() {
    const hemLight = new HemisphereLight(0xffffff, 0x222233, 4);
    this.app3d.scene.add(hemLight);
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view', undefined, true);
    this.app3d.camera.position.set(0.9, 0, 0);
    this.app3d.camera.lookAt(0, 0, 0);
    this.app3d.updater.start();
    this.app3d.scene.background = this.textureCube;
    const controls = util.addControls(this.app3d);
    controls.autoRotate = true;
    controls.autoRotateSpeed = -1;
    this.app3d.updater.add(controls.update);
    this.addLight();
  }

  render() {
    return (
        <div>
          <img style={{position: 'absolute', 'objectFit': 'cover'}} width='500' height='250'  src={this.props.imgUrl}/>
          <div  style={{'width': '1000px'}} className='code-view'></div>
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
