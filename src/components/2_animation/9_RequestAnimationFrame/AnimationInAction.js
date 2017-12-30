import React, { Component } from 'react';
import { App3D } from '../../../3D';
import { CubeGeometry, MeshBasicMaterial, Mesh } from 'three';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import CodeView from '../../CodeView/CodeView';


class AnimationInAction extends Component {
  constructor() {
    super();
    this.cube = this.makeCube();
    this.state = {
      editorArgs: {
        'cube': this.cube,
        'renderer': { render: () => {} },
        'scene': {},
        'camera': {},
      },
      code:
`function animate(timestamp) {
  cube.rotation.x += 0.05;
  cube.position.x = Math.sin(timestamp / 300);
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
`,
    }
  }

  componentDidMount() {
    this.app3d = new App3D('.code-view');
    this.app3d.camera.position.set(0, 0, 5);
    this.app3d.scene.add(this.cube);
    const editorArgs = {
      'cube': this.cube,
      'renderer': this.app3d.renderer,
      'scene': this.app3d.scene,
      'camera': this.app3d.camera,
    };
    this.setState({ editorArgs }, () => {
      this.codeView.onChange(this.state.code);
    });
  }

  makeCube() {
    const geometry = new CubeGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({color: 0x00ff00});
    return new Mesh(geometry, material);
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Animation in action</h2>
            <CodeView
                ref={instance => { this.codeView = instance; }}
                width='500'
                fontSize={15}
                readOnly={true}
                code={this.state.code}
                args={this.state.editorArgs}
            />
          </Card>
        </div>
    );
  }
}

export default AnimationInAction;
