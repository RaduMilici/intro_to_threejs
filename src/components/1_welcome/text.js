import fontData from '../../fonts/gentilis_regular.typeface.json';
import { FontLoader, Mesh, TextGeometry, MeshBasicMaterial } from 'three';
import { scene, updater } from '../../3D';

const addText = () => {
  const font = loadFont();
  const mesh = makeTextMesh(font);
  centerText(mesh)
};

const loadFont = () => {
  // https://threejs.org/docs/index.html#api/loaders/FontLoader
  const loader = new FontLoader();
  return loader.parse(fontData);
}


const makeTextMesh = (font) => {
  // https://threejs.org/docs/index.html#api/geometries/TextGeometry
  const geometry = new TextGeometry('intro to three.js', { font, height: 0.1, size: 10 });
  // helps us center the text horizontally
  const mesh = new Mesh(geometry, new MeshBasicMaterial({ color: 0x52d3fa }));
  scene.add(mesh);
  return mesh;
}

const centerText = (mesh) => {
  mesh.geometry.computeBoundingBox();   // https://threejs.org/docs/index.html#api/core/Geometry.boundingBox
  mesh.geometry.computeVertexNormals(); // https://threejs.org/docs/index.html#api/core/Geometry.computeFlatVertexNormals
  mesh.position.x = -0.5 * ( mesh.geometry.boundingBox.max.x - mesh.geometry.boundingBox.min.x );
  mesh.position.y = -0.5 * ( mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y );
}

export default addText;
