import React, {Component} from 'react';
import GridGraph from '../../GridGraph';
import { Navigator, Grid, Vector } from '../../../../lib/pulsar-pathfinding';


class fVal extends Component {
  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.stop = { x: 4, y: 4 };
    this.size = { width: 5, height: 5 };
    this.canvasSize = { width: 500, height: 500 };
    this.state = { steps: 0 };
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
    for (let i = 0; i < this.state.steps; i++) {
      const tile = navigator.path[i];
      const neighbors = grid.getNeighbors(tile);

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (neighbor.id === navigator.begin.id) continue;
        const canvasTile = this.canvas.getTile(neighbor.position);
        const { gVal, hVal } = neighbor.getNavigatorData(navigator);
        const posG = new Vector(canvasTile.centroid).add({ x: -40, y: -30 });
        const posH = new Vector(canvasTile.centroid).add({ x: 20, y: -30 });
        const posF = new Vector(canvasTile.centroid).add({ x: -15, y: 15 });
        const fontSize = 15;
        const g = Math.round(gVal * 10);
        const h = Math.round(hVal * 10);
        const f = Math.round(g + h);
        this.canvas.draw.text(g, posG, fontSize, 'white');
        this.canvas.draw.text(h, posH, fontSize, 'white');
        this.canvas.draw.text(f, posF, 25, '#52d3fa');
      }
    }

    const last = navigator.path[this.state.steps - 1];
    if (last) {
      const lastCanvasTile = this.canvas.getTile(last.position);
      lastCanvasTile.drawCurrent();
    }
  }

  stepNavigator = (num) => {
    const steps = this.state.steps + num;

    if (steps >= 0 && steps <= this.size.width) {
      this.setState({ steps }, this.navigate);
    }
  };

  render() {
    return (
        <div>
          <div style={{display: 'flex'}}>
            <GridGraph ref='grid' canvasSize={this.canvasSize} size={this.size} start={this.start} stop={this.stop}/>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', flexDirection: 'column', padding: 30}}>
              <ul className='space-list' style={{height: '100%', justifyContent: 'space-around',}}>
                <li>The F value is simply the sum of the G and H value.</li>
                <li>Every step, the navigator chooses an unexplored neighboring node with the lowest F value.</li>
              </ul>
              <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly'}}>
                <button className='button' onClick={() =>this.stepNavigator(-1)}> &larr; </button>
                <button className='button' onClick={() =>this.stepNavigator(1)}> &rarr; </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default fVal;
