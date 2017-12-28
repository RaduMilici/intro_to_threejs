import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';
import Updater from './Updater';

class App3D {
  constructor(containerId) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera( 75, null, 0.1, 1000 );
    this.renderer = new WebGLRenderer({ antialias: false });
    this.updater = new Updater({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
    });
    this.container = null;
    this.createScene(containerId);
  }

  createScene(containerId) {
    this.container = document.querySelector(containerId);
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( this.container.offsetWidth, this.container.offsetHeight);
    this.container.appendChild( this.renderer.domElement );
  }

  destroyScene() {
    const gl = this.renderer.domElement.getContext('webgl');
    gl.getExtension('WEBGL_lose_context').loseContext();
    this.disposeHierarchy(this.scene);
    this.renderer.forceContextLoss();
    this.renderer.context = null;
    this.renderer.domElement = null;
    this.renderer = null;
  }

  disposeHierarchy(obj) {
    for (var i = obj.children.length - 1; i >= 0; i--) {
      var child = obj.children[i];
      obj.remove(child);
      this.disposeHierarchy(child, this.disposeObject.bind(this));
      this.disposeObject(child);
    }
  };

  disposeObject(obj) {
    if (obj.geometry) {
      obj.geometry.dispose ();
    }

    if (obj.material) {
      this.disposeMaps(obj.material);
      obj.material.dispose ();
    }
  };

  disposeMaps(mat) {
    const mapNames = ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap', 'envMap'];
    mapNames.forEach(mapName => {
      if (mat[mapName]) mat[mapName].dispose();
    });
  }
}

export default App3D;
