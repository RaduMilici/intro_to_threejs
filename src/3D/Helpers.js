import { GridHelper, AxesHelper, CameraHelper, Object3D } from 'three';

class Helpers extends Object3D {
  constructor() {
    super();
    this.addGid();
    this.addAxes();
    this.camera = null;
    this.cameraHelper = null;
  }

  addGid() {
    const size = 10;
    const divisions = 10;
    const color = 0x444444;
    this.gridHelper = new GridHelper(size, divisions, color, color);
    this.add(this.gridHelper);
  }

  addAxes() {
    const size = 5;
    this.axesHelper = new AxesHelper(size);
    this.add(this.axesHelper);
  }

  setCamera(camera) {
    if (this.cameraHelper || this.camera) {
      this.remove(this.camera);
      this.remove(this.cameraHelper);
    }
    this.add(camera);
    camera.updateProjectionMatrix();
    const cameraHelper = new CameraHelper(camera);
    cameraHelper.update();
    this.cameraHelper = cameraHelper;
    this.add(cameraHelper);
  }
}

export default Helpers;
