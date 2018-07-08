import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Wall from './obstacles/wall';

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
                  <Tab>Wall</Tab>
                  <Tab>Maze</Tab>
                  <Tab>Concave</Tab>
                </TabList>

                <TabPanel>
                  <Wall obstacles={this.makeWall()}>
                    <li>Obstacles can be toggled dynamically according to navigator preference (avoid ferries, tolls).</li>
                    <li>Simple linear obstacles are the best case scenario because they don't confuse the heuristics into thinking they are getting closer to the destination.</li>
                    <li>It is enough to check if a neighboring node is marked as an obstacle and if so, ignore it when looping through adjacent neighbors.</li>
                  </Wall>
                </TabPanel>

                <TabPanel>
                  <Wall obstacles={this.makeMaze()}>
                    <li>Mazes are harder than linear obstacles because even if they mostly have fewer choices, its not always obvious which one is correct.</li>
                    <li>Every tile in the path remembers which tile led up to it, effectively forming a chain.</li>
                    <li>A* will keep escalating F values if it has no choice.</li>
                  </Wall>
                </TabPanel>

                <TabPanel>
                  <Wall obstacles={this.makeConcave()}>
                    <li>Concave dead-ends are the worst case scenario.</li>
                    <li>Their H value can keep decreasing and trick the navigator into thinking its on the right path.</li>
                    <li>A* other fully explores a concave area until it runs out of options and tries to go around it.</li>
                    <li>This can be optimised by detecting and marking areas as dead ends by giving them a higher H value.</li>
                  </Wall>
                </TabPanel>
              </Tabs>
            </div>
          </Card>
        </div>
    );
  }
}

export default Obstacles;
