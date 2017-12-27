import React, { Component } from 'react';
import { App3D } from '../../3D';
import SceneView from '../SceneView/SceneView';
import WireframePlane from '../../3D/WireframePlane';
import Card from '../Card/Card';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import './3_renderer.css';

class WhatIsThree extends Component {
  constructor() {
    super();
    this.state = {
      code: `console.log('hello');`
    }
  }

  componentDidMount() {
    this.addBackground();
    this.addDemoView();
  }

  addBackground() {
    const app3d = new App3D('#WebGL');
    const wireframePlane = new WireframePlane(app3d.updater);
    app3d.scene.add(wireframePlane);
    app3d.camera.position.z = 50;
    app3d.updater.start();
  }

  addDemoView() {
    const app3d = new App3D('.renderer-demo-scene');
    const wireframePlane = new WireframePlane(app3d.updater);
    app3d.scene.add(wireframePlane);
    app3d.camera.position.z = 50;
    app3d.updater.start();
  }

  onChange(code) {
    try {
      const f = new Function(code);
      f();
    } catch (e) {
      if (e instanceof SyntaxError) {
        console.log(e);
      }
    }
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Renderer</h2>
            <AceEditor
                className='ace-editor'
                mode='javascript'
                theme='github'
                onChange={this.onChange}
                value={this.state.code}
                editorProps={{$blockScrolling: true}}
            />
            <div className='renderer-demo-scene'>

            </div>
          </Card>
        </div>
    );
  }
}

export default WhatIsThree;
