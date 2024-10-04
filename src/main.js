import * as THREE from 'three';
import Player from './entities/Player.js';
import Turret from './entities/Turret.js';
import Wall from './entities/Wall.js';
import Ground from './entities/Ground.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(-12, 14, -17);
camera.lookAt(0, 0, 0);

// Controles orbitais para teste
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

const player = new Player(scene);
// const wall = new Wall(scene, 5, 3, 0.1, { x: 0, y: 1.5, z: -5 }); 
// const turret = new Turret(scene)

// Um plano que serve para marcar o chão da fase
const ground = new Ground(scene)

// Luz Ambiente
const light = new THREE.AmbientLight(0xffffff, 3);
light.position.set( 0, 5, 0)
scene.add(light)

// Função animate, que executa a cada quadro
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Um array que atribui true para as teclas que estão pressionadas
const keysPressed = {}
window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if(player)
        player.movementControls(keysPressed);
});
window.addEventListener('keyup',  (event) => {
    keysPressed[event.key] = false;
});