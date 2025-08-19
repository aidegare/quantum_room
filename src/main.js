import './style.css'
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Uncomment to see axes helper
const axesHelper = new THREE.AxesHelper( 100 );
axesHelper.position.set(50, 50, 50);
scene.add( axesHelper );

const canvasStats = document.getElementById('stats');
const canvas = document.getElementById('experience');

const stats = new Stats();
canvasStats.appendChild( stats.dom );


const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize( sizes.width, sizes.height );
renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;
document.body.appendChild( renderer.domElement ); 

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 8, 8, -8);
camera.lookAt( 0, 20, 0 );
const cameraHelper = new THREE.CameraHelper(camera);
scene.add(cameraHelper);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );

loader.load('./quantum_room.glb', function ( gltf ) {
    scene.add( gltf.scene );
  },
  undefined, function ( error ) {
    console.error( error );
  }
);
scene.add( loader );

const sun = new THREE.DirectionalLight( 0xffffff, 1 );
sun.position.set( 20, 20, -10 );
sun.castShadow = true;
sun.shadow.mapSize.width = 4096;
sun.shadow.mapSize.height = 4096;
sun.shadow.camera.left = -150;
sun.shadow.camera.right = 60;
sun.shadow.camera.top = 80;
sun.shadow.camera.bottom = -80;
sun.shadow.normalBias = 0.5;
scene.add( sun.target );
scene.add( sun );
// uncomment to see area of shadows cast and where light is
const shadowHelper = new THREE.CameraHelper( sun.shadow.camera );
scene.add( shadowHelper );
const lightHelper = new THREE.DirectionalLightHelper( sun, 5 );
scene.add( lightHelper );


// handles the resizing of the window
function onResize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  const aspect = sizes.width / sizes.height;
  camera.left = -aspect * 50;
  camera.right = aspect * 50;
  camera.top = 50;
  camera.bottom = -50;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio( Math.min(window.devicePixelRatio, 2) );
}




function animate() {
  stats.update();
  onResize();
  renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );