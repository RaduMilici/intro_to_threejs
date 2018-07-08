import React, {Component} from 'react';
import GridGraph from '../../GridGraph';
import { Vector } from 'pulsar-pathfinding';


class InAction extends Component {
  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.stop = { x: 44, y: 22 };
    this.size = { width: 45, height: 23 };
    this.canvasSize = { width: 900, height: 500 };
    this.state = { steps: 0 };
    this.obstacleCount = 450;
    this.debugInterval = 50;
  }

  componentDidMount() {
    this.start = this.props.start || { x: 0, y: 0 };
    this.refs.grid.makeGrid();
    const start = this.refs.grid.grid.findTile(this.start);
    const stop = this.refs.grid.grid.findTile(this.stop);
    this.refs.grid.grid.obstacles.addToForbidden(start);
    this.refs.grid.grid.obstacles.addToForbidden(stop);
    this.refs.grid.grid.obstacles.addRandom(this.obstacleCount);
    this.refs.grid.start({ debugInterval: this.debugInterval, onProgress: this.onNavExplore });
  }

  onNavExplore = ({ position }) => {
    const tile = this.refs.grid.canvas.getTile(position);
    tile.fill('blue');
    tile.stroke();
  };

  reset = () => {
    this.refs.grid.stopNavigator();
    this.refs.grid.grid.obstacles.clear();
    this.refs.grid.grid.obstacles.addRandom(this.obstacleCount);
    this.refs.grid.start({ debugInterval: this.debugInterval, onProgress: this.onNavExplore });
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
                <button className='button' onClick={this.reset}> reset </button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default InAction;
