import React from 'react';
import SceneView from '../SceneView/SceneView';
import Card from '../Card/Card';
import stop_motion from '../../../src/img/stop_motion.gif';

const AnimationLoop = () => {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{'max-width': '1000px'}}>
              <h2>Animation loop</h2>
              <pre>{`function animate() {
  takeUserInput();
  updateScene();
  render();
  animate();
}
              `}</pre>
              <img style={{'display': 'block'}} width='600px' src={stop_motion}/>
            </div>
          </Card>
        </div>
    );
}

export default AnimationLoop;
