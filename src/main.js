import * as THREE from 'three';
import Player from './entities/Player.js';
import Turret from './entities/Turret.js';
import Wall from './entities/Wall.js';
import Ground from './entities/Ground.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

const player = new Player(scene);
// const wall = new Wall(scene, 5, 3, 0.1, { x: 0, y: 1.5, z: -5 }); 
// const turret = new Turret(scene);

// Um plano que serve para marcar o chão da fase
const ground = new Ground(scene);

// Luz Ambiente
const light = new THREE.AmbientLight(0xffffff, 3);
light.position.set(0, 5, 0);
scene.add(light);

// Função animate, que executa a cada quadro
function animate() {
    const clock = new THREE.Clock();  // Relógio para medir o deltaTime

    function render() {
        requestAnimationFrame(render);

        // Calcula o tempo entre frames
        const deltaTime = clock.getDelta();

        // Atualiza a posição da textura do chão
        ground.update(deltaTime);

        // Atualiza os controles orbitais
        controls.update();

        // Renderiza a cena
        renderer.render(scene, camera);
    }

    render();
}

// Um array que atribui true para as teclas que estão pressionadas
const keysPressed = {};
window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (player) {
        player.movementControls(keysPressed);
    }
});
window.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

// Iniciar a animação
animate();
