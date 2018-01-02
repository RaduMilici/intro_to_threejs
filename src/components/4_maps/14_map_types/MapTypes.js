import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MapSampler from './MapSampler';
import 'react-tabs/style/react-tabs.css';
import diffuseMapUrl from '../../../textures/brick/bricks_1024_albedo.jpg';
import normalMapUrl from '../../../textures/brick/bricks_1024_normal.jpg';
import heightMapUrl from '../../../textures/brick/bricks_1024_height.jpg';

class LightTypes extends Component {
  constructor() {
    super();
    const loaderCode = 'const loader = new THREE.TextureLoader();';
    const diffuseMapCode =
`loader.load(mapUrls.diffuse, map => {
  wall.material.map = map;
  wall.material.needsUpdate = true;
});`
    const normalMapCode =
`loader.load(mapUrls.normal, map => {
  wall.material.normalMap = map;
  wall.material.normalScale = { x: 3, y: 3 };
  wall.material.needsUpdate = true;
});`
    const displacementMapCode =
`loader.load(mapUrls.displacement, map => {
  wall.material.displacementMap = map;
  wall.material.displacementScale = 2;
  //wall.material.wireframe = true;
  wall.material.needsUpdate = true;
});`

    this.state = {
      diffuseMapCode: `${loaderCode}\n\n${diffuseMapCode}`,
      normalMapCode: `${loaderCode}\n\n${normalMapCode}`,
      displacementMapCode: `${loaderCode}\n\n${displacementMapCode}`,
      combinedMapCode: `${loaderCode}\n\n${diffuseMapCode}\n\n${normalMapCode}\n\n${displacementMapCode}`,
      diffuseMapUrl,
      normalMapUrl,
      heightMapUrl,
    };
  }
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Map types</h2>
            <Tabs>
              <TabList>
                <Tab>Diffuse map</Tab>
                <Tab>Normal map</Tab>
                <Tab>Displacement map</Tab>
                <Tab>All maps</Tab>
              </TabList>

              <TabPanel>
                <MapSampler
                    code={this.state.diffuseMapCode}
                    mapUrls={{diffuse: this.state.diffuseMapUrl}}
                />
              </TabPanel>
              <TabPanel>
                <MapSampler
                    code={this.state.normalMapCode}
                    mapUrls={{normal: this.state.normalMapUrl}}
                />
              </TabPanel>
              <TabPanel>
                <MapSampler
                    code={this.state.displacementMapCode}
                    mapUrls={{displacement: this.state.heightMapUrl}}
                />
              </TabPanel>
              <TabPanel>
                <MapSampler
                    code={this.state.combinedMapCode}
                    mapUrls={{
                      diffuse: this.state.diffuseMapUrl,
                      normal: this.state.normalMapUrl,
                      displacement: this.state.heightMapUrl,
                    }}
                />
              </TabPanel>
            </Tabs>
          </Card>
        </div>
    );
  }
}

export default LightTypes;
