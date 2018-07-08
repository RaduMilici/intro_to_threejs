import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Cooperative from './advanced/cooperative';
import Avoidance from './advanced/avoidance';
import Navmesh from './advanced/navmesh';
import Nonplanar from './advanced/nonplanar';

class Advanced extends Component {

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Advanced</h2>
            <div style={{width: 1200}}>
              <Tabs>
                <TabList>
                  <Tab>Cooperative</Tab>
                  <Tab>Local avoidance</Tab>
                  <Tab>Nonplanar graphs</Tab>
                  <Tab>Nav meshes</Tab>
                </TabList>

                <TabPanel>
                  <Cooperative/>
                </TabPanel>

                <TabPanel>
                  <Avoidance/>
                </TabPanel>

                <TabPanel>
                  <Nonplanar/>
                </TabPanel>

                <TabPanel>
                  <Navmesh/>
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
    );
  }
}

export default Advanced;
