import React, { Component } from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';
import { App3D, util } from '../../../../3D/index';
import checker from '../../../../textures/checker.jpg';

class TextureMapping extends Component {

  makeBox() {
    const box = util.makeBox(5, 5, 5);
    box.material.color.setHex(0xffffff);
    util.loadTexture(checker, map => {
      box.material.map = map;
      box.material.needsUpdate = true;
    });
    this.app3d.updater.add((timestamp, delta) => {
      box.rotation.x += 1 * delta;
      box.rotation.y += 1 * delta;
      box.rotation.z += 1 * delta;
    });
    return box;
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 10);
    this.app3d.camera.lookAt(0, 0, 0);
    this.app3d.scene.add(this.makeBox());
    this.app3d.updater.start();
  }

  render() {
    return (
      <div>
        <SceneView/>
        <Card>
          <div style={{'maxWidth': '1000px'}}>
            <h2>Texture mapping</h2>
            <ul>
              <li>A method for defining detail, surface texture, or color information on a 3D model.</li>
              <li>Originally referred to a method that mapped pixels from a texture to a 3D surface.</li>
              <li>In recent decades, the advent of many other variations on the technique <strong>(controlled by a material system)</strong> have made it possible to simulate near-photorealism in real time.</li>
            </ul>
            <img src={checker} width='500'/>
            <div className='code-view'></div>
          </div>
        </Card>
      </div>
    );
  }
}

export default TextureMapping;
