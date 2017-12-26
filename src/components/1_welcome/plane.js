import { PlaneGeometry, Mesh, TextureLoader, ShaderMaterial, RepeatWrapping, Color } from 'three';
import textureUrl from '../../textures/noise.jpg';
import { scene, updater } from '../../3D';

const speed = 0.05;
const vertexShader = `
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

const fragmentShader = `
  uniform vec3 color;
  uniform sampler2D noiseMap;

  void main() {
    gl_FragColor = vec4(color, 1.);
  }
`;

const makeMaterial = () => {
  var noiseMap = new TextureLoader().load(textureUrl);
  noiseMap.wrapS = noiseMap.wrapT = RepeatWrapping;

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
};

const addPlane = () => {
  var geometry = new PlaneGeometry( 150, 100, 150, 100 );
  var plane = new Mesh( geometry, makeMaterial() );
  updater.add((timestamp, delta) => { plane.material.uniforms.time.value += speed * delta; });
  scene.add( plane );
};

export default addPlane;
