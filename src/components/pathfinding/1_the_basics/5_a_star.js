import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import aStarAlgo from '../../../img/a_star_algo.gif';

const aStar = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>A* algorithm</h2>
          <div style={{display: 'flex', width: 1000, alignItems: 'center'}}>
            <div>
              <ul style={{margin: 0}}>
                <li>
                  A modification of Dijkstra’s algorithm that is optimized for a single destination. Dijkstra’s algorithm can find paths to all locations.
                </li>
                <br/>
                <li>
                  Dijkstra’s pathfinding algorithm tracks how far we are from the starting point, but not how close we are to the target node.
                </li>
                <br/>
                <li>
                  Achieves better performance by using heuristics to guide its search. Is considered a "best first search" because it <i>greedily</i> chooses which vertex to explore next.
                </li>
              </ul>
            </div>
            <div style={{'flex-grow': 1, margin: 10}}>
              <img width='420' height='290' src={aStarAlgo}/>
            </div>
          </div>
        </Card>
      </div>
  );
};

export default aStar;
