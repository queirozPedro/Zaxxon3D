import * as THREE from 'three';
import Player from './Player.js';
import Obstacle from './Obstacle.js';
import Score from './Score.js';
import SoundManager from './SoundManager.js';

class Game {
    constructor() {
        // Configurações da cena
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        // Adicionando uma luz
        const light = new THREE.AmbientLight(0xffffff); // Luz ambiente
        this.scene.add(light);

        // Criando o jogador
        this.player = new Player();
        this.scene.add(this.player.mesh);

        // Criando obstáculos com diferentes tipos
        const obstacleTypes = ['ship', 'wall', 'turret'];
        this.obstacles = Array.from({ length: 5 }, () => {
            const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
            return new Obstacle(type);
        });
        this.obstacles.forEach(obstacle => this.scene.add(obstacle.mesh));

        // Criando o chão
        this.createGround();

        // Posição inicial do jogador
        this.player.mesh.position.z = -5;

        // Ajustando a câmera
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);

        // Score
        this.score = new Score();

        // SoundManager
        this.soundManager = new SoundManager(this.camera);

        // Iniciando a animação
        this.animate();
    }

    createGround() {
        const planeGeometry = new THREE.PlaneGeometry(10, 10);
        const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -Math.PI / 2; // Rotacionando o plano
        this.scene.add(plane);
    }

    updateCamera() {
        const offset = new THREE.Vector3(0, 5, 10);
        this.camera.position.lerp(this.player.mesh.position.clone().add(offset), 0.1);
        this.camera.lookAt(this.player.mesh.position);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Mover obstáculos
        this.obstacles.forEach(obstacle => {
            obstacle.move();
            if (obstacle.mesh.position.z > 5) {
                obstacle.resetPosition();
                this.score.increment();
            }
        });

        // Atualizar pontuação
        this.score.update();

        // Atualizar a posição da câmera
        this.updateCamera();

        // Rotação da nave para efeito visual
        this.player.rotate();

        this.renderer.render(this.scene, this.camera);
    }

    handleKeyDown(event) {
        this.player.move(event.key);
        this.soundManager.playSound();
    }
}

export default Game;
