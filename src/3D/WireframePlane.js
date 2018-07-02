import { PlaneGeometry, Mesh, TextureLoader, ShaderMaterial, RepeatWrapping, Color, Object3D } from 'three';
import textureUrl from '../textures/noise.jpg';

class WireframePlane extends Object3D {
  constructor(updater) {
    super();
    this.updater = updater;
    this.speed = 0.01;
    this.vertexShader = `
      uniform float time;
      uniform float height;
      uniform sampler2D noiseMap;
      
      void main() {
        vec2 vUv = uv;
        vUv.y -= time;
        vec4 col = texture2D(noiseMap, vUv);
        vec3 offsetPos = position;
        offsetPos.y += col.r * height;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(offsetPos,1.0);
      }
    `;
    this.fragmentShader = `
      uniform vec3 color;
      uniform sampler2D noiseMap;
    
      void main() {
        gl_FragColor = vec4(color, 1.);
      }
    `;
    this.addWireframePlane();
  }

  makeMaterial(col) {
    const noiseMap = new TextureLoader().load(textureUrl);
    noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;
    const vertexShader = this.vertexShader;
    const fragmentShader = this.fragmentShader;

    return new ShaderMaterial({
      wireframe: true,
      uniforms: {
        color: { value: new Color(col) },
        time: { value: 0 },
        height: { value: 30 },
        noiseMap: { value: noiseMap },
      },
      vertexShader,
      fragmentShader,
    });
  }

  addWireframePlane() {
    const geometry = new PlaneGeometry( 150, 120, 50, 50 );
    const plane = new Mesh( geometry, this.makeMaterial(0x2C5B61) );
    const plane2 = new Mesh( geometry, this.makeMaterial('rgb(41, 44, 52)') );
    plane2.position.z = -10;

    this.updater.add((timestamp, delta) => {
      plane.material.uniforms.time.value += this.speed * delta;
      plane2.material.uniforms.time.value += this.speed * delta;
    });
    this.add(plane);
    this.add(plane2);
  }

}

export default WireframePlane;
