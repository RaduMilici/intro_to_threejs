import React, { Component } from 'react';
import SceneView from '../../../SceneView/SceneView';
import Card from '../../../Card/Card';

class RequestAnimationFrame extends Component {
  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <div style={{'max-width': '1000px'}}>
              <h2>requestAnimationFrame</h2>
              <code>requestAnimationFrame(callback);</code>
              <ul>
                <li>Tells the browser that you wish to perform an animation.</li>
                <li>Takes a callback as an argument to be invoked before the repaint.</li>
                <li>Returns an integer that can be passed to <code>cancelAnimationFrame</code> to cancel the callback request.</li>
                <li>The number of callbacks is usually 60 times per second.</li>
                <li>Calls are paused in most browsers when running in background tabs or hidden &lt;iframe&gt;s in order to improve performance and battery life.</li>
              </ul>
            </div>
          </Card>
        </div>
    );
  }
}

export default RequestAnimationFrame;
