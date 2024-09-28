import * as THREE from 'three';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(8, 10, 10);
camera.lookAt(0, 0, 0);

// Controles orbitais para teste
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Classe Player que representa o jogador
class Player {
    constructor() {
        // Declaração do player (nave do jogador)
        const playerGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
        const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const player = new Player(new THREE.Mesh(playerGeometry, playerMaterial));
        scene.add(player.player);
        this.player = player;
        this.minHeight = 0.35; // Altura mínima (limite do chão)
        this.maxHeight = 5;   // Altura máxima (limite superior)
        //definir a altura inicial 
        this.player.position.y = this.minHeight;
    }

    movementControls(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                if (this.player.position.y < this.maxHeight) {
                    this.player.position.y += 0.1;
                }
                break;
            case 'ArrowDown':
            case 's':
                if (this.player.position.y > this.minHeight) {
                    this.player.position.y -= 0.1;
                }
                break;
            case 'ArrowLeft':
            case 'a':
                this.player.position.x -= 0.1;
                break;
            case 'ArrowRight':
            case 'd':
                this.player.position.x += 0.1;
                break;
        }
    }
}

const player = new Player();

// Um plano que serve para marcar o chão da fase
const planeGeometry = new THREE.PlaneGeometry(20, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.z = -20;
scene.add(plane);

// Função animate, que executa a cada quadro
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Listener para capturar pressionamentos de tecla
window.addEventListener('keydown', (event) => {
    player.movementControls(event);
});
