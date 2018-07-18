import React, {Component} from 'react';
import uniqueId from '../../../../2D/uniqueID';
import Canvas from '../../../../2D/Canvas';
import { Navigator, Grid, Vector } from '../../../../lib/pulsar-pathfinding';


class InAction extends Component {
  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.stop = { x: 44, y: 22 };
    this.size = { width: 45, height: 23 };
    this.canvasSize = { width: 900, height: 500 };
    this.state = { steps: 0 };
    this.obstacleCount = 300;
    this.debugInterval = 50;
    this.canvasId = `canvas_${uniqueId()}`;
    this.navigators = [];
  }

  componentDidMount() {
    this.startNav();
  }

  componentWillUnmount() {
    this.navigators.forEach(navigator => navigator.stop());
  }

  randomColor() {
    const r = 255*Math.random()|0,
        g = 255*Math.random()|0,
        b = 255*Math.random()|0;
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  startNav() {
    this.navigators.forEach(navigator => navigator.stop());
    this.navigators.length = 0;
    const canvas = new Canvas(`#${this.canvasId}`, this.canvasSize);
    canvas.drawGrid(this.size, { width: 20, height: 20 });
    const grid = new Grid(this.size);

    const onNavExplore = ({ position }) => {
      const tile = canvas.getTile(position);
      tile.fill('blue');
      tile.stroke();
    };
    const onNavComplete = (path) => {
      const color = this.randomColor();
      path.forEach(({ position }) => {
        const tile = canvas.getTile(position);
        tile.fill(color);
        tile.stroke();
      });
    };

    const begin1 = grid.findTile(new Vector({ x: 0, y: 0 }));
    const end1 = grid.findTile(new Vector({ x: 44, y: 22 }));
    const begin2 = grid.findTile(new Vector({ x: 44, y: 0 }));
    const end2 = grid.findTile(new Vector({ x: 0, y: 22 }));
    const begin3 = grid.findTile(new Vector({ x: 22, y: 0 }));
    const end3 = grid.findTile(new Vector({ x: 22, y: 22 }));

    grid.obstacles.addToForbidden(begin1);
    grid.obstacles.addToForbidden(end1);
    grid.obstacles.addToForbidden(begin2);
    grid.obstacles.addToForbidden(end2);
    grid.obstacles.addToForbidden(begin3);
    grid.obstacles.addToForbidden(end3);

    grid.obstacles.addRandom(this.obstacleCount);

    grid.obstacles.list.forEach(({ position }) => {
      const tile = canvas.getTile(position);
      tile.fill('black');
      tile.stroke();
    });


    this.makeNavigator(grid, begin1, end1, onNavComplete, onNavExplore);
    this.makeNavigator(grid, begin2, end2, onNavComplete, onNavExplore);
    this.makeNavigator(grid, begin3, end3, onNavComplete, onNavExplore);
  }

  makeNavigator(grid, start, stop, onNavComplete, onNavExplore) {
    const navigator = new Navigator(
        grid,
        start,
        stop,
        onNavExplore,
        onNavComplete,
        undefined,
        undefined,
        this.debugInterval
    );
    this.navigators.push(navigator);
    navigator.start();
  }

  render() {
    return (
        <div>
          <div style={{display: 'flex'}}>
            <canvas id={this.canvasId}></canvas>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly', flexDirection: 'column', padding: 30}}>
              <ul className='space-list' style={{height: '100%'}}>
                {this.props.children}
              </ul>
              <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly'}}>
                <button className='button' onClick={this.startNav.bind(this)}> reset </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InAction;
