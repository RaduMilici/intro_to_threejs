import React from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';
import Quote from '../../../Card/Quote/Quote';

const Materials = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>5. Materials</h2>
          <Quote
              width='1000'
              text='I don’t have to be at the Grand Canyon to appreciate the way the real world works. I can see that in reflections of light in my bathroom.'
              author='John Carmack - CTO at Oculus VR, made revolutionary and innovative achievements in the video and computer game industry'
          />
        </Card>
      </div>
  );
}

export default Materials;
