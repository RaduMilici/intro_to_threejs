import { Geometry, ShaderMaterial, AdditiveBlending, Points, Color } from 'three';
import { util, random } from '../../util';
import {scene, updater} from '../../3D';

const cage = { x: 150, y: 100, z: 10 };
const speed = 5;
const count = 1000;
const vertexShader = `
  uniform float time;
  uniform vec3 direction;
  uniform vec3 cage;
  
  void main() {
    vec3 pos = position + direction * time;
    pos = mod(pos, cage);
    pos -= cage / 2.0;
    gl_PointSize = sin(pos.y) * 3.;
    gl_Position = projectionMatrix  * modelViewMatrix * vec4( pos, 1.0 );
  }
`;

const fragmentShader =`  
  uniform float time;
  uniform vec3 color;
  
  void main() {
    gl_FragColor = vec4(color, 1.);
  }
`;

const makeParticles = () => {
  const material = new ShaderMaterial({
    blending: AdditiveBlending,
    uniforms: {
      time: { value: 0 },
      direction : { value: { x: 0, y: 1, z: 0 } },
      cage : { value: { x: cage.x, y: cage.y, z: cage.z } },
      color: { value: new Color(0x91AAB4) },
    },
    vertexShader,
    fragmentShader,
  });
  const geometry = new Geometry();
  const rndX = { min: -cage.x / 2, max: cage.x / 2};
  const rndY = { min: -cage.y / 2, max: cage.y / 2};
  const rndZ = { min: -cage.z / 2,  max: cage.z / 2 };
  util.times(() => geometry.vertices.push(random.position(rndX, rndY, rndZ)), count);
  updater.add((timestamp, delta) => { material.uniforms.time.value += speed * delta; });
  scene.add(new Points(geometry, material));
};

export default makeParticles;
