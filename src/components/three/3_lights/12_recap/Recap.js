import React, { Component } from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';

class LightsRecap extends Component {
  render() {
    return (
        <div className='recap'>
          <SceneView/>
          <Card>
            <h2>Lights recap</h2>
            <ol>
              <li>
                Choose a material that is affected by lights.
                <br/>
                <code>new THREE.MeshLambertMaterial();</code>
                <br/>
                <code>new THREE.MeshPhongMaterial();</code>
                <br/>
                <code>new THREE.MeshStandardMaterial();</code>
              </li>

              <li>
                Create a light.
                <br/>
                <code>const light = new THREE.SpotLight();</code>
              </li>

              <li>
                Add light to the scene.
                <br/>
                <code>scene.add(light);</code>
              </li>

              <li>Turn on shadows (if you need them).
                <br/>
                <code>renderer.shadowMap.enabled = true;</code>
                <br/>
                <code>light.castShadow = true;</code>
                <br/>
                <code>someMesh.castShadow = true;</code>
                <br/>
                <code>otherMesh.receiveShadow = true;</code>
              </li>
            </ol>
          </Card>
        </div>
    );
  }
}

export default LightsRecap;
