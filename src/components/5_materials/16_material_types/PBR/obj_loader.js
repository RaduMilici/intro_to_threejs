import * as THREE from 'three';
import OBJLoaderImport from 'three-obj-loader';
import cerberus from '../../../../../src/models/cerberus/Cerberus.obj';
import cerberusA from '../../../../../src/models/cerberus/Cerberus_A.jpg';
import cerberusRM from '../../../../../src/models/cerberus/Cerberus_RM.jpg';
import cerberusN from '../../../../../src/models/cerberus/Cerberus_N.jpg';
import px from '../../../../../src/textures/cube/pisa/hdr/px.hdr';
import nx from '../../../../../src/textures/cube/pisa/hdr/nx.hdr';
import py from '../../../../../src/textures/cube/pisa/hdr/py.hdr';
import ny from '../../../../../src/textures/cube/pisa/hdr/ny.hdr';
import pz from '../../../../../src/textures/cube/pisa/hdr/pz.hdr';
import nz from '../../../../../src/textures/cube/pisa/hdr/nz.hdr';

import HDRCubeTextureLoader from '../../../../lib/HDRCubeTextureLoader';
import RGBELoader from '../../../../lib/RGBELoader';
import PMREMGenerator from '../../../../lib/PMREMGenerator';
import PMREMCubeUVPacker from '../../../../lib/PMREMCubeUVPacker';

function loadMesh(callback) {
  const clone = { ...THREE };
  OBJLoaderImport(clone);
  new clone.OBJLoader().load(cerberus, callback);
}

function loadMaterial(renderer) {
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshStandardMaterial();
  material.roughness = 1;
  material.metalness = 1;
  material.map = loader.load(cerberusA);
  material.metalnessMap = material.roughnessMap = loader.load(cerberusRM);
  material.normalMap = loader.load(cerberusN);
  material.map.wrapS = THREE.RepeatWrapping;
  material.roughnessMap.wrapS = THREE.RepeatWrapping;
  material.metalnessMap.wrapS = THREE.RepeatWrapping;
  material.normalMap.wrapS = THREE.RepeatWrapping;
  loadHRD(material, renderer);
  return material;
}

function loadHRD(material, renderer) {
  const hrdUrls = [px, nx, py, ny, pz, nz];
  new HDRCubeTextureLoader().load(THREE.UnsignedByteType, hrdUrls, hdrCubeMap => {
    const pmremGenerator = new PMREMGenerator( hdrCubeMap );
    pmremGenerator.update( renderer );
    const pmremCubeUVPacker = new PMREMCubeUVPacker( pmremGenerator.cubeLods );
    pmremCubeUVPacker.update( renderer );
    const hdrCubeRenderTarget = pmremCubeUVPacker.CubeUVRenderTarget;
    material.envMap = hdrCubeRenderTarget.texture;
    material.needsUpdate = true;
  });
}

export { loadMesh, loadMaterial };
