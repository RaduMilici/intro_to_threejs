import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import dijkstrasAlgo from '../../../img/dijkstras_algo.gif';

const Dijkstra = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>Dijkstra's algorithm</h2>
          <div style={{display: 'flex', width: 1000, alignItems: 'center'}}>
            <div>
              <ul style={{margin: 0}}>
                <li>
                  An algorithm for finding the shortest paths from one node to <strong>all</strong> other nodes in a graph.
                </li>
                <br/>
                <li>
                  This is not the shortest line between <strong>all</strong> points (minimum spanning tree found using Prim's or Kruskal's algorithm).
                </li>
                <br/>
                <li>
                  If the nodes of the graph represent cities and edge costs represent distances between cities connected by a road,
                  Dijkstra's algorithm can be used to find the shortest route between one city and <strong>all</strong> other cities.
                </li>
                <br/>
                <li>This is <strong>not</strong> what we are looking at today but rather a variant of it.</li>
              </ul>
            </div>
            <div style={{'flex-grow': 1, margin: 10}}>
              <img width='420' height='290' src={dijkstrasAlgo}/>
            </div>
          </div>
        </Card>
      </div>
  );
};

export default Dijkstra;
