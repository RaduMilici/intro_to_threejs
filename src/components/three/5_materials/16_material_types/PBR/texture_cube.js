import { CubeTextureLoader } from 'three';
import px from '../../../../../textures/cube/pisa/px.png';
import nx from '../../../../../textures/cube/pisa/nx.png';
import py from '../../../../../textures/cube/pisa/py.png';
import ny from '../../../../../textures/cube/pisa/ny.png';
import pz from '../../../../../textures/cube/pisa/pz.png';
import nz from '../../../../../textures/cube/pisa/nz.png';

function loadTextureCube() {
  return new CubeTextureLoader().load([px, nx, py, ny, pz, nz]);
}

export default loadTextureCube;
