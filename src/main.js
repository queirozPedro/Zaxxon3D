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

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

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
ground.ground.receiveShadow = true;

// Luz Ambiente e Luz Pontual
const pointLight = new THREE.PointLight(0xffffff, 10000, 10000);
pointLight.position.set(0, 100, 0); // luz para iluminar os objetos
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight);

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

const player = new Player(scene);
const walls = []
const turrets = []

function startGame(){
    const wall = new Wall(scene, 130);
    walls.push(wall)
    const turret = new Turret(scene, 70, {x:0, y:0, z:90});
    turrets.push(turret)
}

function animate() {
    requestAnimationFrame(animate);
    
    // Atualiza a cena
    update()
    
    renderer.render(scene, camera);    
}

function update(){
    // Calcula o tempo entre frames 
    const deltaTime = clock.getDelta();

    // Verifica colisões e reinicia se necessário
    for(let i = 0; i < walls.length; i++){
        if(walls[i].wall){
            walls[i].update()
        }
        player.update(keysPressed);
        if (player.checkCollision(walls[i].wall)) {
            resetGame();
        }
    }
    for(let i = 0; i < turrets.length; i++){
        turrets[i].update(deltaTime)
    }

    ground.update(deltaTime);
    background.update(); 
}

// Função para reiniciar o jogo
function resetGame() {
    player.reset(); // Reinicia o jogador
    for(let i = 0; i < walls.length; i++){
        walls[i].reset()
    }
    for(let i = 0; i < turrets.length; i++){

    }
}

// Inicia a animação e o jogo
startGame();
animate();
