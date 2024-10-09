import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Player from './entities/Player.js';
import Turret from './entities/Turret.js';
import Wall from './entities/Wall.js';
import Ground from './entities/Ground.js';
import Rocket from './entities/Rocket.js';
import Background from './entities/Background.js';


// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(-12, 19, -17);
camera.lookAt(0, 0, 0);

// Controles orbitais para teste
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

const background = new Background(scene, 10);
const player = new Player(scene);
const ground = new Ground(scene);
const wall = new Wall(scene)
// const rocket = new Rocket(scene)
// const turret = new Turret(scene);

// Luz Ambiente
const light = new THREE.AmbientLight(0xffffff, 3);
light.position.set(0, 20, 0);
scene.add(light);

// Um dicionario que atribui true para as teclas que estão pressionadas no momento
const keysPressed = {};
window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if(keysPressed[' '] || keysPressed['Enter']){
        player.shoot()
    }
});
window.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

// Relógio que será usado para medir o deltaTime
const clock = new THREE.Clock();

function render() {
    requestAnimationFrame(render);

    // Calcula o tempo entre frames 
    const deltaTime = clock.getDelta();

    player.update(keysPressed);
    ground.update(deltaTime);
    wall.update();
    background.update();
    // rocket.updatePosition(player);
    // turret.update(deltaTime);

    renderer.render(scene, camera);    
}

// Função animate, que executa a cada quadro (parecida com o método Update do Unity)
function animate() {
    render();
}

// Iniciar a animação
animate();