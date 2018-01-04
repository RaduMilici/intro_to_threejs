import { CubeTextureLoader } from 'three';
import px from '../../../../../src/textures/cube/pisa/px.png';
import nx from '../../../../../src/textures/cube/pisa/nx.png';
import py from '../../../../../src/textures/cube/pisa/py.png';
import ny from '../../../../../src/textures/cube/pisa/ny.png';
import pz from '../../../../../src/textures/cube/pisa/pz.png';
import nz from '../../../../../src/textures/cube/pisa/nz.png';

function loadTextureCube() {
  const loader = new CubeTextureLoader();
  const textureCube = loader.load( [ px, nx, py, ny, pz, nz ] );
  return textureCube;
}

export default loadTextureCube;
