import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import DirectionalLight from './DirectionalLight';
import SpotLight from './SpotLight'
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
                <Tab>Spot Light</Tab>
                <Tab>Directional light</Tab>
                <Tab>Point Light</Tab>
              </TabList>

              <TabPanel>
                <SpotLight/>
              </TabPanel>
              <TabPanel>
                <DirectionalLight/>
              </TabPanel>
              <TabPanel>
                <h2>Any content 3</h2>
              </TabPanel>
            </Tabs>
          </Card>
        </div>
    );
  }
}

export default LightTypes;
