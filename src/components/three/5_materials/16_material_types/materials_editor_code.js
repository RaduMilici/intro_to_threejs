const basicCode = `// geometry
const geometry = new THREE.TorusKnotGeometry(1, 0.2, 50, 16);
// blue
const blueMat = new THREE.MeshBasicMaterial({ color: 0x14506b });
const blueTorus = new THREE.Mesh(geometry, blueMat);
blueTorus.position.x = -2;
// orange
const orangeMat = new THREE.MeshBasicMaterial({ color: 0x4d4a16 });
const orangeTorus = new THREE.Mesh(geometry, orangeMat);
orangeTorus.position.x = 2;

scene.add(blueTorus, orangeTorus);
return scene;`;

const wireframeCode = `const geometry = new THREE.BoxGeometry(4, 4, 4, 3, 3, 3);
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
return cube;`;

const lambertCode = `// geometry
const geometry = new THREE.SphereGeometry(3, 16, 16);
const material = new THREE.MeshLambertMaterial({ color: 0x14506b });
//material.wireframe = true;
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
return sphere;`;

const phongCode = `// geometry
const geometry = new THREE.SphereGeometry(3, 16, 16);
const material = new THREE.MeshPhongMaterial({ color: 0x14506b });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
return sphere;`;

export { basicCode, wireframeCode, lambertCode, phongCode };