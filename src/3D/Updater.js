import { Clock } from 'three';

class Updater {
  constructor({ renderer, scene, camera }) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.updates = [];
    this.clock = new Clock();
    this.animationFrameId = null;
  }

  start() {
    this.clock.start();
    this.animate();
  }

  stop() {
    this.clock.stop();
    cancelAnimationFrame(this.animationFrameId);
  }

  add(func) {
    this.updates.push(func);
  }

  clear() {
    this.updates.length = 0;
  }

  animate(timestamp) {
    this.animationFrameId = requestAnimationFrame( this.animate.bind(this) );
    const delta = this.clock.getDelta();
    this.updates.forEach(update => update(timestamp, delta));
    this.renderer.render(this.scene, this.camera);
  };
}

export default Updater;
