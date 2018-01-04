import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import MaterialSampler from './MaterialSampler';
import PBRSambler from './PBR/PBRSampler';
import battlezone from '../../../img/battlezone.gif';
import tronLightCycle from '../../../img/tron-lightcycle.gif';
import gouraudShading from '../../../img/gouraud_shading.jpg';
import phongShading from '../../../img/phong_shading.jpg';
import { basicCode, wireframeCode, lambertCode, phongCode } from './materials_editor_code';


class MaterialTypes extends Component {
  constructor() {
    super();

    this.state = { basicCode, wireframeCode, lambertCode, phongCode };
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Material types</h2>
            <Tabs>
              <TabList>
                <Tab>Wireframe</Tab>
                <Tab>Basic</Tab>
                <Tab>Lambert</Tab>
                <Tab>Phong</Tab>
                <Tab>PBR</Tab>
              </TabList>

              <TabPanel>
                <MaterialSampler
                    code={this.state.wireframeCode}
                    imgUrl={battlezone}
                />
              </TabPanel>

              <TabPanel>
                <MaterialSampler
                    code={this.state.basicCode}
                    imgUrl={tronLightCycle}
                />
              </TabPanel>

              <TabPanel>
                <MaterialSampler
                    code={this.state.lambertCode}
                    imgUrl={gouraudShading}
                />
              </TabPanel>

              <TabPanel>
                <MaterialSampler
                    code={this.state.phongCode}
                    imgUrl={phongShading}
                />
              </TabPanel>

              <TabPanel>
                <PBRSambler/>
              </TabPanel>

            </Tabs>
          </Card>
        </div>
    );
  }
}

export default MaterialTypes;
