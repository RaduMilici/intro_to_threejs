import React, {Component} from 'react';
import GridGraph from '../../GridGraph';
import { Vector } from 'pulsar-pathfinding';


class Wall extends Component {
  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.stop = { x: 4, y: 4 };
    this.size = { width: 5, height: 5 };
    this.canvasSize = { width: 500, height: 500 };
    this.state = { steps: 0 };
    this.alreadyDrawn = [];
    this.done = false;
  }

  componentDidMount() {
    this.start = this.props.start || { x: 0, y: 0 };
    this.refs.grid.drawGrid();
    this.canvas = this.refs.grid.canvas;
    this.refs.grid.makeGrid();
    this.grid = this.refs.grid.grid;
    //this.navigate();
    this.obstacles = this.makeObstacles();
    this.refs.grid.start({ obstacles: this.obstacles, debugNavigator: true, debugMaxSteps: 1 });
    this.drawValues(this.refs.grid.navigator, this.refs.grid.grid, this.refs.grid.navigator.begin)
  }

  navigate() {
    const onComplete = path => {
      this.done = true;
      this.alreadyDrawn.length = 0;
      path.forEach(tile => {
        const canvasTile = this.canvas.getTile(tile.position);
        canvasTile.fill('green');
        canvasTile.drawCurrent();
        this.drawNumbers(tile);
      })
    };
    this.refs.grid.start({ obstacles: this.obstacles, debugNavigator: true, debugMaxSteps: this.state.steps, skipDraw: true, onComplete });
    this.drawValues(this.refs.grid.navigator, this.refs.grid.grid, this.refs.grid.navigator.current);
  }

  drawValues(navigator, grid, tile) {
    this.refs.grid.drawStartStop();
    for (let i = 0; i < this.state.steps + 1; i++) {
      const neighbors = [tile, ...grid.getNeighbors(tile)];

      for (let i = 0; i < neighbors.length; i++) {
        const neighbor = neighbors[i];
        if (neighbor.id === navigator.begin.id) continue;
        this.drawNumbers(neighbor);
      }
    }

    if (tile) {
      const lastCanvasTile = this.canvas.getTile(tile.position);
      lastCanvasTile.drawCurrent();
    }
  }

  drawNumbers(neighbor) {
    const canvasTile = this.canvas.getTile(neighbor.position);
    const { gVal, hVal } = neighbor.getNavigatorData(this.refs.grid.navigator);
    const posG = new Vector(canvasTile.centroid).add({ x: -40, y: -30 });
    const posH = new Vector(canvasTile.centroid).add({ x: 20, y: -30 });
    const posF = new Vector(canvasTile.centroid).add({ x: -15, y: 15 });
    const fontSize = 15;
    const g = Math.round(gVal * 10);
    const h = Math.round(hVal * 10);
    const f = Math.round(g + h);

    if (!isNaN(f) && this.alreadyDrawn.indexOf(neighbor.id) === -1) {
      this.alreadyDrawn.push(neighbor.id);
      this.canvas.draw.text(g, posG, fontSize, 'white');
      this.canvas.draw.text(h, posH, fontSize, 'white');
      this.canvas.draw.text(f, posF, 25, '#52d3fa');
    }
  }

  makeObstacles() {
    const obstacles = [];

    this.props.obstacles.forEach(obstacle => {
      obstacles.push(this.grid.findTile(obstacle));
    });

    return obstacles;
  }

  stepNavigator = (num) => {
    const steps = this.state.steps + num;

    if (steps >= 0 && !this.done) {
      this.setState({ steps }, this.navigate);
    }
  };

  reset = () => {
    this.setState({ steps: 0 }, () => {
      this.done = false;
      this.alreadyDrawn.length = 0;
      this.refs.grid.drawGrid();
      this.refs.grid.start({ obstacles: this.obstacles, debugNavigator: true, debugMaxSteps: 1 });
      this.drawValues(this.refs.grid.navigator, this.refs.grid.grid, this.refs.grid.navigator.begin)
    });
  };

  render() {
    return (
        <div>
          <div style={{display: 'flex'}}>
            <GridGraph ref='grid' canvasSize={this.canvasSize} size={this.size} start={this.start} stop={this.stop}/>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly', flexDirection: 'column', padding: 30}}>
              <ul className='space-list' style={{height: '100%'}}>
                {this.props.children}
              </ul>
              <div style={{display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly'}}>
                <button className='button' onClick={() =>this.stepNavigator(-1)}> &larr; </button>
                <button className='button' onClick={() =>this.stepNavigator(1)}> &rarr; </button>
                <button className='button' onClick={this.reset}> reset </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Wall;
