import React, {Component} from 'react';
import GridGraph from '../../GridGraph';
import { Navigator, Grid, Vector } from 'pulsar-pathfinding';
import manhattan from '../../../../img/manhattan_distance.png';


class hVal extends Component {
  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.stop = { x: 4, y: 4 };
    this.size = { width: 5, height: 5 };
    this.canvasSize = { width: 500, height: 500 };
    this.state = { steps: 4 };
  }

  componentDidMount() {
    this.refs.grid.drawGrid();
    this.canvas = this.refs.grid.canvas;
    this.navigate();
  }

  navigate() {
    const grid = new Grid(this.size);
    const navBegin = grid.findTile(new Vector({ x: 0, y: 0 }));
    const navEnd = grid.findTile(
        new Vector({ x: this.size.width - 1, y: this.size.height - 1 })
    );
    const navigator = new Navigator(
        grid,
        navBegin,
        navEnd,
        undefined,
        undefined
    );
    navigator.start();
    this.drawValues(navigator, grid);
  }

  drawValues(navigator, grid) {
    this.refs.grid.drawGrid();
    this.refs.grid.start();
    this.refs.grid.drawStartStop();
    for (let i = 0; i < navigator.tiles.length; i++) {
      const tile = navigator.tiles[i];
      const canvasTile = this.canvas.getTile(tile.position);
      const pos = new Vector(canvasTile.centroid).add({ x: -17.5, y: 15 });
      const { hVal } = tile.getNavigatorData(navigator);
      this.canvas.draw.text(Math.round(hVal * 10), pos, 30, 'white');
    }
  }

  render() {
    return (
        <div>
          <div>
            <div style={{display: 'flex'}}>
              <GridGraph ref='grid' canvasSize={this.canvasSize} size={this.size} start={this.start} stop={this.stop}/>
              <ul className='space-list' style={{margin: 0}}>
                <li>
                  The H (heuristics) value approximates how close we are to the destination node.
                </li>
                <li>
                  <i>Manhattan distance</i>: The distance between two points in a grid based on a strictly horizontal and/or vertical path, as opposed to the diagonal or "as the crow flies" distance.
                </li>
                <div style={{textAlign: 'center'}}>
                  <img width={300} src={manhattan} alt=''/>
                </div>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default hVal;
