import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Background from './entities/Background.js';
import Player from './entities/Player.js';
import Ground from './entities/Ground.js';
import Wall from './entities/Wall.js';
import Turret from './entities/Turret.js';
import Rocket from './entities/Rocket.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(-12, 19, -17);
camera.lookAt(0, 0, 0);

// Controles orbitais
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Environment
const background = new Background(scene, 8);
const ground = new Ground(scene);
const player = new Player(scene);
const wall = new Wall(scene, 130);
const turret = new Turret(scene, 70, {x:0, y:0, z:90});

// Luz Ambiente
const light = new THREE.AmbientLight(0xffffff, 3);
scene.add(light);

// Dicionário que atribui true para as teclas que estão pressionadas
const keysPressed = {};
window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});
window.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

// Relógio que será usado para medir o deltaTime
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    console.log("Animating..."); // Para depuração

    // Calcula o tempo entre frames 
    const deltaTime = clock.getDelta();

    // Atualiza o player
    player.update(keysPressed, wall.wall);

    // Verifica colisões e reinicia se necessário
    if (player.checkCollision(wall.wall)) {
        resetGame();
    }

    player.update(keysPressed);
    ground.update(deltaTime);
    background.update(); 
    wall.update();
    turret.update(deltaTime);

    renderer.render(scene, camera);    
}

// Função para reiniciar o jogo
function resetGame() {
    player.reset(); // Reinicia o jogador
    wall.reset();   // Reinicia as paredes
    // Adicione mais lógica de reinício aqui, se necessário
}

// Inicia a animação
animate();
