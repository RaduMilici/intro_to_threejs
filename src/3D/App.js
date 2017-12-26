import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, null, 0.1, 1000 );
const renderer = new WebGLRenderer();

function createScene() {
  const container = document.querySelector('#WebGL');
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.offsetWidth, container.offsetHeight);
  container.appendChild( renderer.domElement );
}

export { scene, camera, renderer, createScene };