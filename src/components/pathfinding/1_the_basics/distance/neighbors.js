import React, {Component} from 'react';
import GridGraph from '../../GridGraph';
import { Navigator, Grid, Vector } from 'pulsar-pathfinding';


class Neighbors extends Component {
  constructor() {
    super();
    this.start = { x: 1, y: 1 };
    this.size = { width: 3, height: 3 };
  }

  componentDidMount() {
    this.drawGrid();
  }

  drawGrid() {
    this.refs.grid.drawGrid();
    this.canvas = this.refs.grid.canvas;
    this.drawNumbers();
  }

  drawNumbers() {
    const grid = new Grid({ width: 3, height: 3 });
    const middle = grid.findTile({ x: 1, y: 1 });
    const fontSize = 30;
    const fontColor = 'white';

    grid.tiles.forEach(tile => {
      const canvasTile = this.canvas.getTile(tile.position);
      const pos = new Vector(canvasTile.centroid).add({ x: -15, y: 10 });

      if (tile.id === middle.id) {
        this.refs.grid.drawStartStop({ startCol: 'rgba(255, 0, 0, 0.5)' });
        return;
      }

      if (Navigator.isDiagonal(tile, middle)) {
        this.canvas.draw.text(Navigator.diagonalCost * 10, pos, fontSize, fontColor);
      } else {
        this.canvas.draw.text(Navigator.verticalCost * 10, pos, fontSize, fontColor);
      }
    });
  }

  render() {
    return (
        <div>
          <div style={{width: 900}}>
            <div style={{display: 'flex'}}>
              <GridGraph ref='grid' tileSide={166} canvasSize={{width: 500, height: 500}} size={this.size} start={this.start}/>
              <ul className='space-list'>
                <li>
                  A common practice is to multiply the numbers by 10 to obtain integer values.
                </li>
                <li>
                  Different nodes may have artificially higher or lower values. Used to simulate preferred routes (less traffic, scenic view).
                </li>
                <li>
                  The first step towards calculating every node's <strong>G value</strong>.
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default Neighbors;
