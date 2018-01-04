import * as THREE from 'three';
import OBJLoaderImport from 'three-obj-loader';
import cerberus from '../../../../../src/models/cerberus/Cerberus.obj';

function loadMesh(callback) {
  const clone = { ...THREE };
  OBJLoaderImport(clone);
  new clone.OBJLoader().load(cerberus, callback);
}

export default loadMesh;
