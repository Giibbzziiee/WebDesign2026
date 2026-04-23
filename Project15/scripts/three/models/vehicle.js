/**
 * Generate a scene object with a background color
 **/
function getScene() {
  var scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);
  return scene;
}

/**
 * Generate the camera to be used in the scene.
 **/
function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 90, -10);
  return camera;
}

/**
 * Generate the light to be used in the scene.
 * @param {obj} scene: the current scene object
 **/
function getLight(scene) {
  var light = new THREE.PointLight(0xffffff, 1, 0);
  light.position.set(220, 220, 120);
  scene.add(light);

  var ambientLight = new THREE.AmbientLight(0x111111);
  scene.add(ambientLight);

  return light;
}

/**
 * Generate the renderer to be used in the scene
 **/
function getRenderer() {
  var container = document.getElementById('three-container');
  var renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);  // ← append to container, not body
  return renderer;
}

/**
 * Generate the controls to be used in the scene
 **/
function getControls(camera, renderer) {
  var controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.zoomSpeed = 0.4;
  controls.panSpeed = 0.4;
  return controls;
}

/**
 * It's a boat now.
 **/
function loadModel() {
  var loader = new THREE.OBJLoader();

  loader.load('scripts/three/models/vehicle.obj', function (object) {
    object.rotation.z = Math.PI;
    scene.add(object);

    document.querySelector('h1').style.display = 'none';
  });
}

function addCube() {
  var geometry = new THREE.BoxGeometry(10, 2, 10);
  var material = new THREE.MeshPhongMaterial({ color: 0x444444 });
  var cube = new THREE.Mesh(geometry, material);
  cube.position.set(0, 1.25, 0);
  scene.add(cube);
  return cube;
}

function addSphere() {
  var geometry = new THREE.SphereGeometry(5, 32, 32);
  var material = new THREE.MeshPhongMaterial({ color: 0x2288ff });
  var sphere = new THREE.Mesh(geometry, material);
  sphere.position.set(0, -10, 0);
  scene.add(sphere);
  return sphere;
}

/**
 * Render!
 **/
function render() {
  requestAnimationFrame(render);
  scene.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update();
}

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);
var cube = addCube();
var sphere = addSphere();

scene.rotation.x = -3.5 / 2;

loadModel();
render();