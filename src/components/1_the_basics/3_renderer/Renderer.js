import React, { Component } from 'react';
import SceneView from '../../SceneView/SceneView';
import Card from '../../Card/Card';
import CodeView from '../../CodeView/CodeView';

class Renderer extends Component {
  constructor() {
    super();
    this.state = {
      container: null,
      code:
`const container = document.querySelector('.code-view');
const renderer = new THREE.WebGLRenderer();
container.appendChild(renderer.domElement);

renderer.setSize(500, 500);
renderer.setClearColor(0xBADA55, 1);
renderer.clear();
`
    };
  }

  componentDidMount() {
    const container = document.querySelector('.code-view');
    this.setState({ container });
  }

  beforeChange = () => {
    if (this.state.container) {
      while (this.state.container.hasChildNodes()) {
        const child = this.state.container.lastChild;
        const gl = child.getContext('webgl');
        gl.getExtension('WEBGL_lose_context').loseContext();
        this.state.container.removeChild(child);
      }
    }
  }

  render() {
    return (
        <div>
          <SceneView/>
          <Card>
            <h2>Renderer</h2>
            <CodeView
                code={this.state.code}
                fontSize={13}
                beforeChange={this.beforeChange}
            />
          </Card>
        </div>
    );
  }
}

export default Renderer;
