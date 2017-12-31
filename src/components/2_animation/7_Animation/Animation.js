import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import Quote from '../../Card/Quote/Quote';

class Animation extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>2. Animation</h2>
            <Quote
              text='Computers don&#39;t create computer animation any more than a pencil creates pencil animation.'
              author='John Alan Lasseter - chief creative officer of Pixar Animation Studios'
            />
          </Card>
        </div>
    );
  }
}

export default Animation;
