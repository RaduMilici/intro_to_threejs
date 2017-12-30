import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { App3D } from '../../../3D/index';
import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three';
import Stats from 'stats.js';
import './FrameRate.css';

class FrameRate extends Component {

  componentDidMount() {
    this.addDemoView('#container15', 15);
    this.addDemoView('#container30', 30);
    this.addDemoView('#container60');
  }

  addStats(element) {
    const stats = new Stats();
    stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.dom.style.position = 'absolute';
    element.appendChild(stats.dom);
    return stats;
  }

  addSphere(app3d) {
    const geometry = new BoxBufferGeometry( 0.5, 5, 0.5 );
    const material = new MeshBasicMaterial({ color: 0x52d3fa });
    const sphere = new Mesh( geometry, material );
    app3d.updater.add(timestamp => {
      sphere.position.x = Math.sin(timestamp / 800) * 12;
    });
    return sphere;
  }

  addDemoView(containerId, fps) {
    const app3d = new App3D(containerId, fps);
    const width = 1000;
    const height = 160;
    const downRes = 5;
    app3d.renderer.setSize(width / downRes, height / downRes, false);
    app3d.camera.aspect = 500 / 80;
    app3d.camera.fov = 2 * Math.atan( 32 / ( 2 * 15 ) );
    app3d.camera.updateProjectionMatrix();
    app3d.camera.position.set(0, 0, 150);
    const stats = this.addStats(app3d.container);
    app3d.updater.onStartRender = stats.begin;
    app3d.updater.onEndRender = stats.end;
    app3d.scene.add(this.addSphere(app3d));
    app3d.updater.start();
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Frame rate</h2>
            <div className='code-view-wide'>
              <div className='framerate-wide-container' id='container15'></div>
              <div className='framerate-wide-container' id='container30'></div>
              <div className='framerate-wide-container' id='container60'></div>
            </div>
          </Card>
        </div>
    );
  }
}

export default FrameRate;
