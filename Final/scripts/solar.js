/*Ethan Gibson MART499 Final Webpage*/
function getScene() {
  var scene = new THREE.Scene();
  var texture = new THREE.TextureLoader().load('textures/2k_stars.jpg');
  scene.background = texture;
  return scene;
}

function getCamera() {
  var aspectRatio = window.innerWidth / window.innerHeight;
  var camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
  camera.position.set(0, 90, -10);
  return camera;
}


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
  controls.zoomSpeed = 0.1;
  controls.panSpeed = 0.1;
  return controls;
}

function loadSun() {
  var texture = new THREE.TextureLoader().load('textures/2k_sun.jpg');
  var objLoader = new THREE.OBJLoader();
  objLoader.load('scripts/three/models/sun.obj', function(object) {
    object.position.set(0, 0, 0);
    object.scale.set(8, 8, 8);
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({ map: texture });
      }
    });
    scene.add(object);
  });
}

function addSunGlow() {
  var geometry = new THREE.SphereGeometry(10, 32, 32);
  var material = new THREE.MeshBasicMaterial({
    color: 0xff6600,
    transparent: true,
    opacity: 0.15,
    side: THREE.BackSide
  });
  var glow = new THREE.Mesh(geometry, material);
  scene.add(glow);
  return glow;
}

function addPlanet(texturePath, size, distance, speed) {
  var texture = new THREE.TextureLoader().load(texturePath);
  var geometry = new THREE.SphereGeometry(size, 32, 32);
  var material = new THREE.MeshBasicMaterial({ map: texture });
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return { mesh: mesh, distance: distance, speed: speed, angle: Math.random() * Math.PI * 2 };
}

function addSaturnRings(saturnMesh) {
  var texture = new THREE.TextureLoader().load('textures/2k_saturn_ring_alpha.png');
  var geometry = new THREE.RingGeometry(7, 12, 64);

  var pos = geometry.attributes.position;
  var uv = geometry.attributes.uv;
  var v3 = new THREE.Vector3();
  for (var i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    uv.setXY(i, v3.length() < 9.5 ? 0 : 1, 1);
  }

  var material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });
  var ring = new THREE.Mesh(geometry, material);
  ring.rotation.x = Math.PI / 2;
  saturnMesh.add(ring);
}

var planetData = {
  'Mercury': { order: '1st from the Sun', day: '58.6 Earth days', gravity: '3.7 m/s²' },
  'Venus':   { order: '2nd from the Sun', day: '243 Earth days',  gravity: '8.87 m/s²' },
  'Earth':   { order: '3rd from the Sun', day: '24 hours',        gravity: '9.8 m/s²' },
  'Mars':    { order: '4th from the Sun', day: '24.6 hours',      gravity: '3.72 m/s²' },
  'Jupiter': { order: '5th from the Sun', day: '9.9 hours',       gravity: '24.79 m/s²' },
  'Saturn':  { order: '6th from the Sun', day: '10.7 hours',      gravity: '10.44 m/s²' },
  'Uranus':  { order: '7th from the Sun', day: '17.2 hours',      gravity: '8.69 m/s²' },
  'Neptune': { order: '8th from the Sun', day: '16.1 hours',      gravity: '11.15 m/s²' }
};

var planetNames = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

window.addEventListener('click', function(e) {
  var container = document.getElementById('three-container');
  var rect = container.getBoundingClientRect();
  mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var meshes = planets.map(function(p) { return p.mesh; });
  var intersects = raycaster.intersectObjects(meshes, true);

  if (intersects.length > 0) {
    var index = meshes.indexOf(intersects[0].object.parent) !== -1
      ? meshes.indexOf(intersects[0].object.parent)
      : meshes.indexOf(intersects[0].object);
    var name = planetNames[index];
    var data = planetData[name];

    document.getElementById('info-name').textContent = name;
    document.getElementById('info-order').textContent = '📍 ' + data.order;
    document.getElementById('info-day').textContent = '🕐 Day length: ' + data.day;
    document.getElementById('info-gravity').textContent = '⬇️ Gravity: ' + data.gravity;
    document.getElementById('planet-info').style.display = 'block';
  } else {
    document.getElementById('planet-info').style.display = 'none';
  }
});

/**
 * Render!
 **/
function render() {
  requestAnimationFrame(render);
  scene.rotation.y -= 0.001;
  planets.forEach(function(planet) {
    planet.angle += planet.speed;
    planet.mesh.position.x = Math.cos(planet.angle) * planet.distance;
    planet.mesh.position.z = Math.sin(planet.angle) * planet.distance;
  });
  renderer.render(scene, camera);
  controls.update();
}

var scene = getScene();
var camera = getCamera();
var light = getLight(scene);
var renderer = getRenderer();
var controls = getControls(camera, renderer);
var sun = addSunGlow();
var planets = [
  addPlanet('textures/2k_mercury.jpg', 1.5, 20, 0.002),
  addPlanet('textures/2k_venus_surface.jpg', 2.5, 30, 0.0015),
  addPlanet('textures/2k_earth.jpg', 2.5, 42, 0.001),
  addPlanet('textures/2k_mars.jpg', 2, 55, 0.0008),
  addPlanet('textures/2k_jupiter.jpg', 6, 75, 0.0005),
  addPlanet('textures/2k_saturn.jpg', 5, 95, 0.0003),
  addPlanet('textures/2k_uranus.jpg', 3.5, 112, 0.0002),
  addPlanet('textures/2k_neptune.jpg', 3.5, 128, 0.0001)
];
addSaturnRings(planets[5].mesh);
loadSun();
scene.rotation.x = -0.3;

render();