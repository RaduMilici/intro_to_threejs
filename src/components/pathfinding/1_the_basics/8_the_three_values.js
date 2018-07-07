import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GVal from './values/gVal';
import HVal from './values/hVal';
import FVal from './values/fVal';



class TheThreeValues extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>The three values</h2>
            <div style={{width: 1100}}>
              <Tabs forceRenderTabPanel={true}>
                <TabList>
                  <Tab>G value</Tab>
                  <Tab>H value</Tab>
                  <Tab>F value</Tab>
                </TabList>

                <TabPanel>
                  <GVal/>
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

export default TheThreeValues;
