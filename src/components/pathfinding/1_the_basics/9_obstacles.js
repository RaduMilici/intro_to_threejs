import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Wall from './obstacles/wall';
import HVal from './values/hVal';
import FVal from './values/fVal';

class Obstacles extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Obstacles</h2>
            <div style={{width: 1100}}>
              <Tabs forceRenderTabPanel={true}>
                <TabList>
                  <Tab>Simple wall</Tab>
                  <Tab>H value</Tab>
                  <Tab>F value</Tab>
                </TabList>

                <TabPanel>
                  <Wall/>
                </TabPanel>

                <TabPanel>
                  <HVal/>
                </TabPanel>

                <TabPanel>
                  <FVal/>
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
    );
  }
}

export default Obstacles;
