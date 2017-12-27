import { PlaneGeometry, Mesh, TextureLoader, ShaderMaterial, RepeatWrapping, Color, Object3D } from 'three';
import textureUrl from '../textures/noise.jpg';

class WireframePlane extends Object3D {
  constructor(updater) {
    super();
    this.updater = updater;
    this.speed = 0.05;
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

  makeMaterial() {
    const noiseMap = new TextureLoader().load(textureUrl);
    noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;
    const vertexShader = this.vertexShader;
    const fragmentShader = this.fragmentShader;

    return new ShaderMaterial({
      wireframe: true,
      uniforms: {
        color: { value: new Color(0x2C5B61) },
        time: { value: 0 },
        height: { value: 50 },
        noiseMap: { value: noiseMap },
      },
      vertexShader,
      fragmentShader,
    });
  }

  addWireframePlane() {
    const geometry = new PlaneGeometry( 150, 100, 150, 100 );
    const plane = new Mesh( geometry, this.makeMaterial() );
    this.updater.add((timestamp, delta) => {
      plane.material.uniforms.time.value += this.speed * delta;
    });
    this.add(plane);
  }

}

export default WireframePlane;
