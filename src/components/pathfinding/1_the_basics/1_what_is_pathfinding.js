import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';

const WhatIsPathfinding = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>What is pathfinding?</h2>
          <div style={{width: '1100px'}}>
            <ul>
              <li>The plotting by a computer application of the shortest route between two points.</li>
              <br/>
              <li>Searches a <strong>graph</strong> by starting at one node and exploring adjacent nodes until the destination is reached.</li>
              <br/>
              <li>It is not necessary to examine all possible paths.</li>
              <br/>
              <li>Algorithms such as Greedy, Dijkstra, and A* eliminate paths either using educated guesses (heuristics) to find the optimal path. </li>
            </ul>
          </div>
        </Card>
      </div>
  );
};

export default WhatIsPathfinding;
