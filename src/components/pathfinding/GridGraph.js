import React, {Component} from 'react';
import Canvas from '../../2D/Canvas';
import { Navigator, Grid } from 'pulsar-pathfinding';
import uniqueId from '../../2D/uniqueID';

class InputOutput extends Component {
  constructor() {
    super();
    this.canvasId = `canvas_${uniqueId()}`;
  }

  start({ obstacles = [], debugNavigator = false, debugMaxSteps = 0, skipDraw = false, onComplete = () => {} } = {}) {
    if (!skipDraw) {
      this.drawGrid();
    }
    this.debugNavigator = debugNavigator;
    this.debugMaxSteps = debugMaxSteps;
    this.onComplete = onComplete;
    if (!this.grid) {
      this.makeGrid();
    }
    obstacles.forEach(obstacle => this.grid.obstacles.add(obstacle));
    this.drawObstacles();
    this.makeNavigator(this.grid, this.props.size);
  }

  makeGrid() {
    this.grid = new Grid(this.props.size);
  }

  drawGrid() {
    const canvasSize = this.props.canvasSize || { width: 250, height: 250 };
    const canvasWidth = this.props.canvasSize ? this.props.canvasSize.width : canvasSize.width;
    const tileSide = this.props.tileSide || canvasWidth / this.props.size.width;
    const tileSize = { width: tileSide, height: tileSide };
    this.canvas = new Canvas(`#${this.canvasId}`, canvasSize);
    this.canvas.drawGrid(this.props.size, tileSize);
  }

  drawObstacles() {
    this.grid.obstacles.list.forEach(({ position }) => {
      const canvasTile = this.canvas.getTile(position);
      canvasTile.fill('black');
    });
  }

  drawStartStop({ startCol, stopCol } = {}) {
    if (this.props.start) {
      const startTile = this.canvas.getTile(this.props.start);
      startTile.drawStart(startCol);
    }
    if(this.props.stop) {
      const endTile = this.canvas.getTile(this.props.stop);
      endTile.drawEnd(stopCol);
    }
  }

  makeNavigator(grid) {
    const navBegin = grid.findTile(this.props.start);
    const navEnd = grid.findTile(this.props.stop);
    const startTile = this.canvas.getTile(this.props.start);
    const endTile = this.canvas.getTile(this.props.stop);
    startTile.drawStart();

    const onNavComplete = (path) => {
      path.forEach((navTile) => {
        const tile = this.canvas.getTile(navTile.position);
        tile.fill('green');
        tile.stroke();
      });
      endTile.drawEnd();
    };

    this.navigator = new Navigator(
        grid,
        navBegin,
        navEnd,
        undefined,
        this.onComplete || this.onNavComplete,
        this.debugNavigator,
        this.debugMaxSteps
    );
    this.navigator.start();
  }

  render() {
    return (
        <canvas id={this.canvasId}></canvas>
    );
  }
}

export default InputOutput;
