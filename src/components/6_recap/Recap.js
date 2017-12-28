import React, { Component } from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';
import './Recap.css';

class Recap extends Component {
  render() {
    return (
        <div className='recap'>
          <SceneView/>
          <Card>
            <h2>Recap</h2>
            <ol>
              <li>Create a renderer.
                <br/>
                <code>new THREE.WebGLRenderer();</code>
              </li>

              <li>
                Add the renderer canvas to the page.
                <br/>
                <code>container.appendChild(renderer.domElement)</code>
              </li>

              <li>Create a camera.
                <br/>
                <code>new THREE.PerspectiveCamera(fov, aspect, near, far);</code>
              </li>

              <li>Create a scene.
                <br/>
                <code>new THREE.Scene();</code>
              </li>

              <li>Create a mesh with a geometry and a material.
                <br/>
                <code>
                  const geometry = new THREE.CubeGeometry(5, 5, 5);
                  <br/>
                  const material = new THREE.MeshBasicMaterial({'{color: 0x00ff00}'});
                  <br/>
                  const cube = new THREE.Mesh(geometry, material);
                  <br/>
                </code>
              </li>

              <li>
                Add the mesh to the scene.
                <br/>
                <code>scene.add(cube);</code>
              </li>

              <li>
                Render the scene.
                <br/>
                <code>renderer.render(scene, camera);</code>
              </li>

            </ol>
          </Card>
        </div>
    );
  }
}

export default Recap;
