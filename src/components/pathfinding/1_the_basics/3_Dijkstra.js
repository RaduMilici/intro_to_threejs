import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import dijkstra from '../../../img/dijkstra.jpg';

const Dijkstra = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>Edsger Wybe Dijkstra</h2>
          <div style={{display: 'flex', width: 1000}}>
            <div style={{'flex-grow': 1}}>
              <img width='400' height='500' src={dijkstra}/>
            </div>
            <ul style={{margin: 0, display: 'flex', 'justify-content': 'space-between', 'flex-direction': 'column'}}>
              <li>Dutch systems scientist, programmer, software engineer, science essayist, and early pioneer in computing science.</li>
              <li>
                His fundamental contributions cover diverse areas of computing science, including compiler construction, operating systems,
                sequential and concurrent programming, graph algorithms, and philosophical foundations of computer programming and computer science.
              </li>
              <li>
                He coined the phrase "structured programming" and during the 1970s this became the new programming orthodoxy.
              </li>
              <li>
                His ideas about structured programming helped lay the foundations for the birth of the professional discipline of software engineering.
              </li>
            </ul>
          </div>
        </Card>
      </div>
  );
};

export default Dijkstra;
