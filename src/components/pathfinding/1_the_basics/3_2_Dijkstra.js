import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import dijkstra from '../../../img/dijkstra.jpg';

const Dijkstra = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>A bit of history</h2>
          <div style={{width: 1000, 'font-style': 'italic'}}>
            <p>What is the shortest way to travel from Rotterdam to Groningen, in general: from given city to given city.
              It is the algorithm for the shortest path, which I designed in about twenty minutes.</p>
            <p>One morning I was
              shopping in Amsterdam with my young fiancée, and tired, we sat down on the café terrace to drink a cup of
              coffee and I was just thinking about whether I could do this, and I then designed the algorithm for the shortest path.
            </p>
            <p>The publication is still readable, it is, in fact, quite nice. One of the reasons that it is so nice was that I designed it without pencil and paper.</p>
            <p>I learned later that one of the advantages of designing without pencil and paper is that you are almost forced to avoid all
              avoidable complexities. Eventually that algorithm became, to my great amazement, one of the cornerstones of my fame.
            </p>
          </div>
          <p>Edsger Dijkstra, in an interview with Philip L. Frana, Communications of the ACM, 2001</p>
        </Card>
      </div>
  );
};

export default Dijkstra;
