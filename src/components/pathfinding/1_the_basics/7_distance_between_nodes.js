import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import Canvas from '../../../2D/Canvas';
import { Line } from '../../../lib/pulsar-pathfinding';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Pythagoras from './distance/pythagora';
import Neighbors from './distance/neighbors';


class DistanceBetweenNodes extends Component {
  componentDidMount() {
    this.drawGrid();
  }

  drawGrid() {
    const canvasSize = { width: 500, height: 500 };
    const tileSide = 250;
    const tileSize = { width: tileSide, height: tileSide };
    this.canvas = new Canvas(`#distanceCanvas`, canvasSize);
    this.canvas.drawGrid({ width: 2, height: 2 }, tileSize);
    this.drawTriangle();
  }

  drawTriangle() {
    const tile1 = this.canvas.getTile({ x: 0, y: 0 });
    const tile2 = this.canvas.getTile({ x: 0, y: 1 });
    const tile3 = this.canvas.getTile({ x: 1, y: 1 });
    const a = new Line(tile1.centroid, tile2.centroid);
    const b = new Line(tile2.centroid, tile3.centroid);
    const c = new Line(tile3.centroid, tile1.centroid);
    this.canvas.draw.lines([a, b, c], 'white', 5);
    const fontSize = 30;
    const fontColor = 'white';
    this.canvas.draw.text('a', a.midpoint.add({ x: -25, y: 0 }), fontSize, fontColor);
    this.canvas.draw.text('b', b.midpoint.add({ x: 0, y: 30 }), fontSize, fontColor);
    this.canvas.draw.text('c', c.midpoint.add({ x: 15, y: 0 }), fontSize, fontColor);
    this.canvas.draw.points([tile1.centroid, tile2.centroid, tile3.centroid], undefined, undefined, 5);
  }

  render() {
    return (
      <div>
        <SceneView/>
        <Card>
          <h2>Distance between nodes</h2>
          <div style={{width: 900}}>
            <Tabs forceRenderTabPanel={true}>
              <TabList>
                <Tab>Pythagoras</Tab>
                <Tab>Neighbors</Tab>
              </TabList>

              <TabPanel>
                <Pythagoras/>
              </TabPanel>

              <TabPanel>
                <Neighbors/>
              </TabPanel>
            </Tabs>
          </div>
        </Card>
      </div>
    );
  }
}

export default DistanceBetweenNodes;
