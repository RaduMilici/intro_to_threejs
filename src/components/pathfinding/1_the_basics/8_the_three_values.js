import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GVal from './values/gVal';
import Neighbors from './distance/neighbors';


class TheThreeValues extends Component {
  componentDidMount() {
  }

  drawGrid() {
  }

  drawTriangle() {
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>The three values</h2>
            <div style={{width: 900}}>
              <Tabs forceRenderTabPanel={true}>
                <TabList>
                  <Tab>G-val</Tab>
                  <Tab>Neighbors</Tab>
                </TabList>

                <TabPanel>
                  <GVal/>
                </TabPanel>

                <TabPanel>
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
    );
  }
}

export default TheThreeValues;
