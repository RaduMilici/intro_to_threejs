import React from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';
import stop_motion from '../../../../img/stop_motion.gif';

const AnimationLoop = () => {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{'max-width': '1000px'}}>
              <h2>The core loop</h2>
              <pre>{`function animate() {
  takeUserInput();
  updateScene();
  render();
  requestAnimationFrame(animate);
}
              `}</pre>
              <img style={{'display': 'block'}} width='600px' src={stop_motion}/>
              <span className='copyright-info'>Coraline, Copyright &copy; 2009 by Focus Features</span>
            </div>
          </Card>
        </div>
    );
}

export default AnimationLoop;
