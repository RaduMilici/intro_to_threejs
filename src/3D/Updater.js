import { Clock } from 'three';

class Updater {
  constructor({ renderer, scene, camera, frameCap,
                onStartRender = () => {}, onEndRender = () => {} }) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.frameCap = frameCap;
    this.updates = [];
    this.clock = new Clock();
    this.onStartRender = onStartRender;
    this.onEndRender = onEndRender;
    this.animationFrameId = null;
  }

  start() {
    this.clock.start();
    if (this.frameCap) {
      this.msFpsLimit = Math.floor(1000 / this.frameCap);
      this.msLastFrame = performance.now();
      this.animateCapped();
    }
    else {
      this.animate();
    }
  }

  stop() {
    this.clock.stop();
    cancelAnimationFrame(this.animationFrameId);
  }

  add(func) {
    this.updates.push(func);
  }

  remove(func) {
    const index = this.updates.findIndex(u => u.name === func.name);
    if (index > -1) {
      this.updates.splice(index, 1);
    }
  }

  clear() {
    this.updates.length = 0;
  }

  animateCapped(timestamp) {
    const msCurrent = performance.now();
    const msDelta = Math.round(msCurrent - this.msLastFrame);
    const deltaTime = msDelta / 1000;

    if(msDelta >= this.msFpsLimit) {
      this.update(timestamp, deltaTime);
      this.onEndRender();
      this.msLastFrame = msCurrent;
    }
    this.animationFrameId = requestAnimationFrame(this.animateCapped.bind(this));
  }

  animate(timestamp) {
    this.onStartRender();
    const delta = this.clock.getDelta();
    this.update(timestamp, delta);
    this.animationFrameId = requestAnimationFrame(this.animate.bind(this));
    this.onEndRender();
  };

  update(timestamp, delta) {
    this.updates.forEach(update => update(timestamp, delta));
    this.renderer.render(this.scene, this.camera);
  }
}

export default Updater;
