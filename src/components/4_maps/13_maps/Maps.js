import React from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import Quote from '../../Card/Quote/Quote';

const Maps = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>4. Maps</h2>
          <Quote
              width='1000'
              text='The best way to predict the future is to invent it.'
              author='Edwin Earl Catmull - president of Pixar and Walt Disney Animation Studios.'
          />
        </Card>
      </div>
  );
}

export default Maps;
