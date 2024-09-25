import * as THREE from 'three';

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

// Criando obstáculos que serão usados para exemplificar
const obstacleGeometry = new THREE.BoxGeometry(1, 1, 1);
const obstacleMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const obstacles = [];
for (let i = 0; i < 5; i++) {
    const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
    // Math.random gera um número decimal de 0 à 1, multiplicar o resultado por 10 faz com que seja retornado um valor no intervalo de 0 à 10.
    obstacle.position.set(Math.random() * 10 - 5, Math.random() * 3 + 0.5, Math.random() * -20);
    obstacles.push(obstacle);
    scene.add(obstacle);
}

// Um plano que serve de para marcar o chão da fase
const planeGeometry = new THREE.PlaneGeometry(20, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(10, 10, 10);
camera.lookAt(0, 0, 0);

// Controle da nave
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.position.y += 0.1;
            break;
        case 'ArrowDown':
            player.position.y -= 0.1;
            break;
        case 'ArrowLeft':
            player.position.x -= 0.1;
            break;
        case 'ArrowRight':
            player.position.x += 0.1;
            break;
    }
});

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

    renderer.render(scene, camera);
}

animate();