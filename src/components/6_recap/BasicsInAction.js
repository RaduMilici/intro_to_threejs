import React, { Component } from 'react';
import { Scene } from 'three';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';
import CodeView from '../CodeView/CodeView';

class BasicsInAction extends Component {
  constructor() {
    super();
    this.scene = new Scene();
    this.state = {
      code:
`// Create a renderer.
const container = document.querySelector('.code-view');
const renderer = new THREE.WebGLRenderer();
renderer.setSize(500, 500);

// Add the renderer canvas to the page.
container.appendChild(renderer.domElement);

// Create a camera.
const camera = new THREE.PerspectiveCamera(45, 1, 1, 10);
camera.position.set(0, 0, 3);

// Create a scene.
const scene = new THREE.Scene();

// Create a mesh with a geometry and a material.
const geometry = new THREE.CubeGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);

// Add the mesh to the scene.
scene.add(cube);

// Render the scene.
renderer.render(scene, camera);
`,
    }
  }

  componentDidMount() {
  }

  beforeChange = () => {
    const container = document.querySelector('.code-view');
    if (container) {
      while (container.hasChildNodes()) {
        const child = container.lastChild;
        const gl = child.getContext('webgl');
        gl.getExtension('WEBGL_lose_context').loseContext();
        container.removeChild(child);
      }
    }
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>The basics in action</h2>
            <CodeView
                width='520'
                beforeChange={this.beforeChange}
                code={this.state.code}
            />
          </Card>
        </div>
    );
  }
}

export default BasicsInAction;
