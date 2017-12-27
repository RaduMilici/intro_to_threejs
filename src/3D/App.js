import { Scene, PerspectiveCamera, WebGLRenderer } from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera( 75, null, 0.1, 1000 );
camera.position.z = 50;
const renderer = new WebGLRenderer({ antialias: false });

const createScene = () => {
  const container = document.querySelector('#WebGL');
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( container.offsetWidth, container.offsetHeight);
  container.appendChild( renderer.domElement );
}

const destroyScene = () => {
  disposeHierarchy(scene, disposeObject);
}

const disposeHierarchy = (obj, callback) => {
  for (var i = obj.children.length - 1; i >= 0; i--) {
    var child = obj.children[i];
    obj.remove(child);
    disposeHierarchy(child, disposeObject);
    callback(child);
  }
};

const disposeObject = obj => {
  if (obj.geometry) {
    obj.geometry.dispose ();
  }

  if (obj.material) {
    disposeMaps(obj.material);
    obj.material.dispose ();
  }
};

const disposeMaps = mat => {
  const mapNames = ['map', 'lightMap', 'bumpMap', 'normalMap', 'specularMap', 'envMap'];
  mapNames.forEach(mapName => {
    if (mat[mapName]) mat[mapName].dispose();
  });
}

export { scene, camera, renderer, createScene, destroyScene };