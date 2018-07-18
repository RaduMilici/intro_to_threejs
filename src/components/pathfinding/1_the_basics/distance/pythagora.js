import React, {Component} from 'react';
import Canvas from '../../../../2D/Canvas';
import { Line } from '../../../../lib/pulsar-pathfinding';


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
          <div style={{width: 900}}>
            <div style={{display: 'flex'}}>
              <canvas style={{'margin-right': 20}} id='distanceCanvas'></canvas>
              <ul className='space-list'>
                <li>
                  Navigators can move both adjacently and diagonally.
                </li>
                <li>
                  If we set the adjacent distance to <strong>1</strong>, use Pythagoras' theorem to find diagonal cost.
                </li>
                <li>
                  <p>c = &radic;(a<sup>2</sup> + b<sup>2</sup>) &cong;1.4</p>
                </li>
                <li>
                  These numbers can represent <i>any</i> distance as long as they maintain this proportion.
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
  }
}

export default DistanceBetweenNodes;
