import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Wall from './obstacles/wall';
import HVal from './values/hVal';
import FVal from './values/fVal';

class Obstacles extends Component {
  makeWall = () => {
    const obstacles = [];

    for (let i = 1; i < 4; i++) {
      obstacles.push({ x: 2, y: i });
    }

    return obstacles;
  };

  makeConcave = () => {
    const obstacles = [];

    for (let i = 0; i < 4; i++) {
      obstacles.push({ x: 3, y: i });
    }
    obstacles.push({ x: 1, y: 3 });
    obstacles.push({ x: 2, y: 3 });

    return obstacles;
  };

  makeMaze = () => {
    const obstacles = [];

    for (let i = 0; i < 4; i++) {
      obstacles.push({ x: 1, y: i });
    }

    for (let i = 1; i < 5; i++) {
      obstacles.push({ x: 3, y: i });
    }

    return obstacles;
  };

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
                  <Tab>Concave</Tab>
                  <Tab>Maze</Tab>
                </TabList>

                <TabPanel>
                  <Wall obstacles={this.makeWall()}/>
                </TabPanel>

                <TabPanel>
                  <Wall obstacles={this.makeConcave()}/>
                </TabPanel>

                <TabPanel>
                  <Wall obstacles={this.makeMaze()}/>
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
    );
  }
}

export default Obstacles;
