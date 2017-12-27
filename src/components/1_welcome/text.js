import fontData from '../../fonts/Roboto_Regular.json';
import { FontLoader, Mesh, TextGeometry, MeshPhongMaterial, DirectionalLight } from 'three';
import { scene, updater } from '../../3D';

const addText = () => {
  const font = loadFont();
  const mesh = makeTextMesh(font);
  centerText(mesh)
};

const addLight = () => {
  const directionalLight = new DirectionalLight( 0xffffff );
  directionalLight.position.set(-1, 0.5, 1);
  updater.add((timestamp) => {
    directionalLight.position.x = Math.sin(timestamp / 3000) * 3;
  });
  scene.add(directionalLight);
};

const loadFont = () => {
  // https://threejs.org/docs/index.html#api/loaders/FontLoader
  const loader = new FontLoader();
  return loader.parse(fontData);
}

const makeTextMesh = (font) => {
  // https://threejs.org/docs/index.html#api/geometries/TextGeometry
  const textSettings = {
    font,
    height: 3,
    size: 10,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.5,
    bevelSegments: 5
  };
  const geometry = new TextGeometry('intro to three.js', textSettings );
  const materialSettings = { color: 0x52d3fa, specular: 0x222222 };
  const mesh = new Mesh(geometry, new MeshPhongMaterial(materialSettings));
  scene.add(mesh);
  addLight();
  return mesh;
}

const centerText = (mesh) => {
  mesh.geometry.computeBoundingBox();   // https://threejs.org/docs/index.html#api/core/Geometry.boundingBox
  mesh.geometry.computeVertexNormals(); // https://threejs.org/docs/index.html#api/core/Geometry.computeFlatVertexNormals
  mesh.position.x = -0.5 * ( mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x );
  mesh.position.y = -0.5 * ( mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y );
}

export default addText;
