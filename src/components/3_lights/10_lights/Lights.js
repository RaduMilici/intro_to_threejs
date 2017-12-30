import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import Quote from '../../Card/Quote/Quote';

const Lights = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>3. Lights</h2>
          <Quote
              text='Turn your face to the sun and the shadows fall behind you.'
              author='Maori proverb'
          />
        </Card>
      </div>
  );
}

export default Lights;
