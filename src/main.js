import * as THREE from 'three';

// Configurações da cena
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.AmbientLight(0xffffff); // Luz ambiente
scene.add(light);

const playerGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);

// Criando obstáculos
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const obstacles = [];
for (let i = 0; i < 5; i++) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    obstacle.position.set(Math.random() * 10 - 5, Math.random() * 3 + 0.5, Math.random() * -20);
    obstacles.push(obstacle);
    scene.add(obstacle);
}

/*
    Criando um plano para reprensentar o chão
*/
const planeGeometry = new THREE.PlaneGeometry(20, 80);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotacionando o plano para que fique horizontal
scene.add(plane);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Variáveis do jogo
let score = 0;
const scoreElement = document.createElement('div');
scoreElement.style.position = 'absolute';
scoreElement.style.top = '10px';
scoreElement.style.left = '10px';
scoreElement.style.color = 'white';
scoreElement.style.fontSize = '20px';
document.body.appendChild(scoreElement);

// Configuração de áudio
const listener = new THREE.AudioListener();
camera.add(listener);

const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/sound.mp3', (buffer) => {
    sound.setBuffer(buffer);
    sound.setLoop(false);
    sound.setVolume(0.5);
});

// Função de animação
function animate() {
    requestAnimationFrame(animate);

    // Mover obstáculos
    obstacles.forEach(obstacle => {
        obstacle.position.z += 0.1; // Mover o obstáculo para frente
        if (obstacle.position.z > 20) {
            obstacle.position.z = -20; // Reiniciar a posição
            obstacle.position.x = Math.random() * 10 - 5; // Nova posição aleatória
            score++; // Aumentar a pontuação
        }
    });

    // Atualizar pontuação
    scoreElement.innerText = `Score: ${score}`;

    renderer.render(scene, camera);
}

// Controle da nave
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.position.y += 0.1;
            sound.play();
            break;
        case 'ArrowDown':
            player.position.y -= 0.1;
            sound.play();
            break;
        case 'ArrowLeft':
            player.position.x -= 0.1;
            sound.play();
            break;
        case 'ArrowRight':
            player.position.x += 0.1;
            sound.play();
            break;
    }
});

// Iniciando a animação
animate();