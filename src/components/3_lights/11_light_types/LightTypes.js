import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DirectionalLight from './DirectionalLight';
import SpotLight from './SpotLight'
import PointLight from './PointLight';
import 'react-tabs/style/react-tabs.css';

class LightTypes extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Light Types</h2>
            <Tabs>
              <TabList>
                <Tab>Point Light</Tab>
                <Tab>Spot Light</Tab>
                <Tab>Directional light</Tab>
              </TabList>

              <TabPanel>
                <PointLight/>
              </TabPanel>
              <TabPanel>
                <SpotLight/>
              </TabPanel>
              <TabPanel>
                <DirectionalLight/>
              </TabPanel>
            </Tabs>
          </Card>
        </div>
    );
  }
}

export default LightTypes;
