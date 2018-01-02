import React, { Component } from 'react';
import CodeView from '../../CodeView/CodeView';
import { App3D, util } from '../../../3D';
import { MeshStandardMaterial, MeshLambertMaterial, PointLight } from 'three';

class MapSampler extends Component {
  constructor({ code, mapUrls, hide }) {
    super();
    this.state = {
      editorArgs: {
        wall: null,
        graffiti: null,
        mapUrls,
      },
      code,
    };
  }

  setEditorArgs({ wall, graffiti }, code, callback = () => {}) {
    const editorArgs = { wall, graffiti, mapUrls: this.state.editorArgs.mapUrls };
    this.setState({ editorArgs, code }, callback);
  }

  makeEnvironment() {
    const light = new PointLight(0xffffff, 2, 20);
    light.position.z = 10;

    this.app3d.updater.add((timestamp) => {
      light.position.x = 5 * Math.cos(timestamp * 0.0005);
      light.position.y = 5 * Math.sin(-timestamp * 0.0005);
    })

    const graffiti = util.makePlane(3, 1, 100, 100);
    graffiti.material = new MeshLambertMaterial();
    graffiti.position.z = 1.25;

    const wall = util.makePlane(10, 10, 100, 100);
    wall.material = new MeshStandardMaterial();

    this.app3d.scene.add(light, wall, graffiti);
    return { light, wall, graffiti };
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 6);
    util.addControls(this.app3d);
    this.setEditorArgs(this.makeEnvironment(), this.state.code, () => {
      this.codeView.onChange(this.state.code);
    });
    this.app3d.updater.start();
  }

  beforeCodeChange = () => {
    this.app3d.disposeHierarchy();
    this.app3d.updater.clear();
  };

  codeHasChanged = (p, code) => {
    const objects = this.makeEnvironment();
    Object.keys(this.props.hide).forEach(toHide => {
      objects[toHide].visible = false;
    });
    this.setEditorArgs(objects, code, () => { this.codeView.execute(code); });
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

MapSampler.defaultProps = {
  code: '',
  mapUrls: '',
  hide: {},
};

export default MapSampler;
