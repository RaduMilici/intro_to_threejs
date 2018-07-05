import React, {Component} from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import GridGraph from '../GridGraph';
import './input_output.css';

class InputOutput extends Component {
  constructor() {
    super();
    this.start = { x: 0, y: 0 };
    this.stop = { x: 9, y: 9 };
    this.size = { width: 10, height: 10 };
  }

  componentDidMount() {
    this.refs.a.drawGrid();
    this.refs.a.drawStartStop();
    this.refs.b.start();
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{width: 1000}}>
              <h2>Input and output</h2>
              <p>The first thing to do when studying an algorithm is to understand the data. What is the input? What is the output?</p>
              <div style={{display: 'flex', 'justify-content': 'space-between'}}>
                <div className='text-grid'>
                  <strong>Input</strong>
                  <p>Graph search algorithms, including A*, take a graph as input. A graph is a set of locations (nodes) and the connections (edges) between them.</p>
                  <p>A* doesn’t see anything else. It only sees the graph. It doesn’t know whether something is indoors or outdoors, or if it’s a room or a doorway, or how big an area is.</p>
                  <GridGraph ref='a' size={this.size} stop={this.stop} start={this.start}/>
                </div>
                <div className='text-grid'>
                  <strong>Output</strong>
                  <p>The path found by A* is made of graph nodes and edges. Both are abstract mathematical concepts.</p>
                  <p>You’ll have to decide whether a graph edge returned by A* means moving from tile to tile or walking in a straight line or opening a door or swimming or running along a curved path.</p>
                  <GridGraph ref='b' size={this.size} stop={this.stop} start={this.start}/>
                </div>
              </div>
            </div>
          </Card>
        </div>
    );
  }
}

export default InputOutput;
