import * as THREE from 'three';
import {
  PlaneBufferGeometry, TorusKnotBufferGeometry, SphereBufferGeometry,
  BoxBufferGeometry, BoxGeometry, Mesh, TextureLoader,
} from 'three';
import OrbitControlsImport from 'three-orbit-controls';
const OrbitControls = OrbitControlsImport(THREE);

const util = {
  addControls(app3d) {
    const controls = new OrbitControls(app3d.camera, app3d.container);
    app3d.updater.add(controls.update);
    return controls;
  },
  makePlane(width, height) {
    const geometry = new PlaneBufferGeometry(width, height);
    return new Mesh(geometry);
  },
  makeTorusKnot(radius, tube, tubularSegments, radialSegments) {
    const geometry = new TorusKnotBufferGeometry( radius, tube, tubularSegments, radialSegments );
    return new Mesh(geometry);
  },
  makeSphere(radius, widthSegments, heightSegment) {
    const geometry = new SphereBufferGeometry(radius, widthSegments, heightSegment );
    return new Mesh(geometry);
  },
  makeBox(width, height, depth) {
    const geometry = this.makeBoxBufferGeom(width, height, depth);
    return new Mesh(geometry);
  },
  makeBoxBufferGeom(width, height, depth) {
    return new BoxBufferGeometry(width, height, depth);
  },
  makeBoxGeom(width, height, depth) {
    return new BoxGeometry(width, height, depth);
  },
  loadTexture(url, callback) {
    const loader = new TextureLoader();
    loader.load(url, callback);
  }
}

export default util;
