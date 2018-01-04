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
            <h2>Light types</h2>
            <Tabs>
              <TabList>
                <Tab>Directional and Ambient</Tab>
                <Tab>Spot</Tab>
                <Tab>Point</Tab>
              </TabList>

              <TabPanel>
                <DirectionalLight/>
              </TabPanel>
              <TabPanel>
                <SpotLight/>
              </TabPanel>
              <TabPanel>
                <PointLight/>
              </TabPanel>
            </Tabs>
          </Card>
        </div>
    );
  }
}

export default LightTypes;
