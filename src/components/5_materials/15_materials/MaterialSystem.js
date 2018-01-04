import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import pbr_assorted_materials from '../../../img/pbr_assorted_materials.jpg';

class MaterialSystem extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{'maxWidth': '1000px'}}>
              <h2>Material system</h2>
              <ul>
                <li>An enhancement of texture mapping and a pre-requisite for advanced shading effects.</li>
                <li>Allows objects in 3D environments to simulate different types of materials in real life.</li>
                <li>Instead of the object just being a model with a texture applied to it, the object is made up of a material.</li>
              </ul>
              <img width='1000' src={pbr_assorted_materials}/>
              <span className='copyright-info'><a href='https://www.jeremyromanowski.com/'>Jeremy Romanowski</a></span>
            </div>
          </Card>
        </div>
    );
  }
}

export default MaterialSystem;
