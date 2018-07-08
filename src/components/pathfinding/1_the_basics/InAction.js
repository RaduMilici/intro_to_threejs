import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import InAction from './multiple/in_action';
import Multiple from './multiple/multiple';

class MultipleNavigators extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>A* in action</h2>
            <div style={{width: 1100}}>
              <Tabs forceRenderTabPanel={true}>
                <TabList>
                  <Tab>Single</Tab>
                  <Tab>Multiple</Tab>
                </TabList>

                <TabPanel>
                  <InAction/>
                </TabPanel>

                <TabPanel>
                  <Multiple/>
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
    );
  }
}

export default MultipleNavigators;
