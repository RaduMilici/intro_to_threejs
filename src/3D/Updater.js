import { Clock } from 'three';
import { renderer, scene, camera } from './App';

const updates = [];
const clock = new Clock();
let animationFrameId;

const updater = {
  start() {
    clock.start();
    animate();
  },
  stop() {
    clock.stop();
    cancelAnimationFrame(animationFrameId);
  },
  add(func) {
    updates.push(func);
  }
};

const animate = (timestamp) => {
  animationFrameId = requestAnimationFrame( animate );
  const delta = clock.getDelta();
  updates.forEach(update => update(timestamp, delta));
  renderer.render(scene, camera);
};



export default updater;