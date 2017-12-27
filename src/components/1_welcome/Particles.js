import { Geometry, ShaderMaterial, AdditiveBlending, Points, Color, Object3D } from 'three';
import { util, random } from '../../util';

class Particles extends Object3D {
  constructor(updater) {
    super();
    this.updater = updater;
    this.cage = { x: 150, y: 100, z: 10 };
    this.speed = 5;
    this.count = 1000;
    this.vertexShader = `
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
    this.fragmentShader =`  
      uniform float time;
      uniform vec3 color;
      
      void main() {
        gl_FragColor = vec4(color, 1.);
      }
    `;
    this.makeParticles();
  }

  makeParticles() {
    const cage = this.cage;
    const vertexShader = this.vertexShader;
    const fragmentShader = this.fragmentShader;
    const material = new ShaderMaterial({
      blending: AdditiveBlending,
      uniforms: {
        time: { value: 0 },
        direction : { value: { x: 0, y: 1, z: 0 } },
        cage : { value: cage },
        color: { value: new Color(0x91AAB4) },
      },
      vertexShader,
      fragmentShader,
    });
    const geometry = new Geometry();
    const rndX = { min: -cage.x / 2, max: cage.x / 2};
    const rndY = { min: -cage.y / 2, max: cage.y / 2};
    const rndZ = { min: -cage.z / 2,  max: cage.z / 2 };
    util.times(() => geometry.vertices.push(random.position(rndX, rndY, rndZ)), this.count);
    this.updater.add((timestamp, delta) => { material.uniforms.time.value += this.speed * delta; });
    this.add(new Points(geometry, material));
  }
}

export default Particles;
