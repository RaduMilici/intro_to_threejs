import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import Canvas from '../../../2D/Canvas';

class _Grid extends Component {
  componentDidMount() {
    const canvas = new Canvas('#canvas', { width: 500, height: 500 });
    const gridSize = { width: 10, height: 10 };
    const tileSide = 50;
    const tileSize = { width: tileSide, height: tileSide };
    canvas.drawGrid(gridSize, tileSize);
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>2. Grid</h2>
            <canvas id='canvas'></canvas>
          </Card>
        </div>
    );
  }
}

export default _Grid;
