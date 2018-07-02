import React from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';

const Support = () => {
  return (
      <div>
        <SceneView/>
        <Card>
          <h2>Browser support</h2>
          <iframe width='1000' height='680' src="https://caniuse.com/#search=webgl"></iframe>
        </Card>
      </div>
  );
};

export default Support;
