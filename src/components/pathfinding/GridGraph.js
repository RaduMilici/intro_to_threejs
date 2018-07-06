import React, {Component} from 'react';
import Canvas from '../../2D/Canvas';
import { Navigator, Grid } from 'pulsar-pathfinding';
import uniqueId from '../../2D/uniqueID';

class InputOutput extends Component {
  constructor() {
    super();
    this.canvasId = `canvas_${uniqueId()}`;
  }

  start() {
    this.drawGrid();
    const grid = new Grid(this.props.size);
    this.makeNavigator(grid, this.props.size);
  }

  drawGrid() {
    const canvasSize = this.props.canvasSize || { width: 250, height: 250 };
    const canvasWidth = this.props.canvasSize ? this.props.canvasSize.width : canvasSize.width;
    const tileSide = this.props.tileSide || canvasWidth / this.props.size.width;
    const tileSize = { width: tileSide, height: tileSide };
    this.canvas = new Canvas(`#${this.canvasId}`, canvasSize);
    this.canvas.drawGrid(this.props.size, tileSize);
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
      path.forEach(({ position }) => {
        const tile = this.canvas.getTile(position);
        tile.fill('green');
        tile.stroke();
      });
      endTile.drawEnd();
    };

    const navigator = new Navigator(
        grid,
        navBegin,
        navEnd,
        undefined,
        onNavComplete
    );
    navigator.start();
  }

  render() {
    return (
        <canvas id={this.canvasId}></canvas>
    );
  }
}

export default InputOutput;
