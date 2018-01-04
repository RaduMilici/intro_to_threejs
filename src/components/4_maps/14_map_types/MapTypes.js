import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MapSampler from './MapSampler';
import 'react-tabs/style/react-tabs.css';
import diffuseMapUrl from '../../../textures/brick/bricks_1024_albedo.jpg';
import normalMapUrl from '../../../textures/brick/bricks_1024_normal.jpg';
import heightMapUrl from '../../../textures/brick/bricks_1024_height.jpg';
import graffitiMapUrl from '../../../textures/graffit_style.jpg';
import graffitiAlphaMapUrl from '../../../textures/graffit_style_alpha.jpg';

class LightTypes extends Component {
  constructor() {
    super();
    const loaderCode = 'const loader = new THREE.TextureLoader();';
    const diffuseMapCode = 'wall.material.map = loader.load(mapUrls.diffuse);';
    const normalMapCode = `wall.material.normalMap = loader.load(mapUrls.normal);
wall.material.normalScale = { x: 5, y: 5 };`
    const displacementMapCode = `wall.material.displacementMap = loader.load(mapUrls.disp);
wall.material.displacementScale = 2;`;
    const alphaMapCode = `graffiti.material.map = loader.load(mapUrls.graffiti);
graffiti.material.alphaMap = loader.load(mapUrls.graffitiAlpha);
graffiti.material.transparent = true;`

    this.state = {
      diffuseMapCode: `${loaderCode}\n${diffuseMapCode}\n`,
      normalMapCode: `${loaderCode}\n${normalMapCode}\n`,
      displacementMapCode: `${loaderCode}\n${displacementMapCode}\n//wall.material.wireframe = true;\n`,
      alphaMapCode: `${loaderCode}\n${alphaMapCode}\n`,
      combinedMapCode:
`${loaderCode}
// diffuse
${diffuseMapCode}
// normal
${normalMapCode}
// displacement
${displacementMapCode}
// alpha
${alphaMapCode}\n`,
      mapUrls: {
        diffuse: diffuseMapUrl,
        normal: normalMapUrl,
        disp: heightMapUrl,
        graffiti: graffitiMapUrl,
        graffitiAlpha: graffitiAlphaMapUrl,
      },
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
                <Tab>Diffuse</Tab>
                <Tab>Normal</Tab>
                <Tab>Displacement</Tab>
                <Tab>Alpha</Tab>
                <Tab>All maps</Tab>
              </TabList>

              <TabPanel>
                <MapSampler
                    code={this.state.diffuseMapCode}
                    mapUrls={this.state.mapUrls}
                    previewName='diffuse'
                    hide={{graffiti: true}}
                />
              </TabPanel>

              <TabPanel>
                <MapSampler
                    code={this.state.normalMapCode}
                    mapUrls={this.state.mapUrls}
                    previewName='normal'
                    hide={{graffiti: true}}
                />
              </TabPanel>

              <TabPanel>
                <MapSampler
                    code={this.state.displacementMapCode}
                    mapUrls={this.state.mapUrls}
                    previewName='disp'
                    hide={{graffiti: true}}
                />
              </TabPanel>

              <TabPanel>
                <MapSampler
                    code={this.state.alphaMapCode}
                    mapUrls={this.state.mapUrls}
                    previewName='graffitiAlpha'
                    hide={{wall: true}}
                />
              </TabPanel>

              <TabPanel>
                <MapSampler
                    showPreview={false}
                    code={this.state.combinedMapCode}
                    mapUrls={this.state.mapUrls}
                />
              </TabPanel>
            </Tabs>
          </Card>
        </div>
    );
  }
}

export default LightTypes;
