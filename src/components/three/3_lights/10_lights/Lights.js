import React from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';
import Quote from '../../../Card/Quote/Quote';

const Lights = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>3. Lights</h2>
          <Quote
              text='The light at the end of the tunnel is just the light of an oncoming train.'
              author='Robert Lowell - american poet'
          />
        </Card>
      </div>
  );
}

export default Lights;
