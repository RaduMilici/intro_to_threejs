import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D, util } from '../../../3D';
import { MeshStandardMaterial, PointLight } from 'three';

class DiffuseMap extends Component {
  constructor({ code, mapUrls }) {
    super();
    this.state = {
      editorArgs: {
        wall: null,
        mapUrls,
      },
      code,
    };
  }

  setEditorArgs(wall, code, callback = () => {}) {
    const editorArgs = { wall, mapUrls: this.state.editorArgs.mapUrls };
    this.setState({ editorArgs, code }, callback);
  }

  makeEnvironment() {
    const light = new PointLight(0xffffff, 2, 20);
    light.position.z = 5;

    this.app3d.updater.add((timestamp) => {
      light.position.x = 5 * Math.cos(timestamp * 0.0005);
      light.position.y = 5 * Math.sin(-timestamp * 0.0005);
    })

    const wall = util.makePlane(10, 10);
    wall.material = new MeshStandardMaterial();
    this.app3d.scene.add(light, wall);
    return { light, wall };
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 5);
    util.addControls(this.app3d);
    const { wall } = this.makeEnvironment();
    this.setEditorArgs(wall, this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    this.app3d.updater.start();
  }

  beforeCodeChange = () => {
    this.app3d.disposeHierarchy();
    this.app3d.updater.clear();
  };

  codeHasChanged = (p, code) => {
    const { wall } = this.makeEnvironment();
    this.setEditorArgs(wall, code, () => { this.codeView.execute(code); });
  }

  render() {
    return (
        <div>
          <CodeView
              ref={instance => { this.codeView = instance; }}
              args={this.state.editorArgs}
              code={this.state.code}
              beforeChange={this.beforeCodeChange}
              onChange={this.codeHasChanged}
          />
        </div>
    );
  }
}

export default DiffuseMap;
