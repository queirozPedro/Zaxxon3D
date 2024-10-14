import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Bullet from '../entities/Bullet.js';

class Player {
    constructor(scene) {
        this.model = null;
        this.scene = scene;
        this.minHeight = 0.4; // Altura mínima (limite do chão)
        this.maxHeight = 10;   // Altura máxima (limite superior)
        this.maxWidthVariation = 13.5; // Limites de movimentação lateral
        this.bullets = [];
        this.isShooting = false;
        this.load(); // Chama o método de carregamento do modelo
    }

    update(keysPressed, walls) {
        this.movementControls(keysPressed);

        for (let i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
        }
    }

    movementControls(keysPressed) {
        // impede que o modelo seja referenciado sem nem existir
        if (!this.model) return;

        // Controla o movimento para cima
        if ((keysPressed['w'] || keysPressed['ArrowUp']) && this.model.position.y < this.maxHeight) {
            this.model.position.y += 0.05;
            if (this.model.rotation.x > -1.9) {
                this.model.rotation.x -= 0.02;
            }
        } else if (this.model.rotation.x < -1.57) {
            this.model.rotation.x += 0.05;
        }

        // Controla o movimento para baixo
        if ((keysPressed['s'] || keysPressed['ArrowDown']) && this.model.position.y > this.minHeight) {
            this.model.position.y -= 0.05;
            if (this.model.rotation.x < -1.2) {
                this.model.rotation.x += 0.02;
            }
        } else if (this.model.rotation.x > -1.57) {
            this.model.rotation.x -= 0.05;
        }

        // Controla o movimento para a esquerda
        if ((keysPressed['a'] || keysPressed['ArrowLeft']) && this.model.position.x < this.maxWidthVariation) {
            this.model.position.x += 0.05;
            if (this.model.rotation.y < 0.3) {
                this.model.rotation.y += 0.02;
            }
        } else if (this.model.rotation.y > 0) {
            this.model.rotation.y -= 0.05;
        }

        // Controla o movimento para a direita
        if ((keysPressed['d'] || keysPressed['ArrowRight']) && this.model.position.x > -this.maxWidthVariation) {
            this.model.position.x -= 0.05; 
            if (this.model.rotation.y > -0.3) {
                this.model.rotation.y -= 0.02;
            }
        } else if (this.model.rotation.y < 0) {
            this.model.rotation.y += 0.05;
        }

        // Controle de tiro
        if (keysPressed[' '] || keysPressed['Enter']) {
            if (!this.isShooting) {
                this.shoot();
                this.isShooting = true;
            }
        } else {
            this.isShooting = false;
        }
    }

    shoot() {
        const bullet = new Bullet(this.scene, this.model.position, this.model.rotation, 90, 0, true);
        this.bullets.push(bullet);
    }

    load() {
        const loader = new GLTFLoader();

        loader.load(
            '/src/assets/models/spaceship/scene.gltf',

            (gltf) => {
                this.scene.add(gltf.scene);
                this.model = gltf.scene.children[0];
                this.model.position.set(0, 2, 0);
                this.model.scale.set(0.8, 1, 0.8);
            },

            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },

            (error) => {
                console.error('Erro ao carregar o modelo:', error);
            }
        );
    }

    checkCollision(walls) {
        for (const wall of walls) {
            if (wall && this.model) {
                // Verifica colisão com a parede
                const playerBox = new THREE.Box3().setFromObject(this.model);
                const wallBox = new THREE.Box3().setFromObject(wall);
                if (playerBox.intersectsBox(wallBox)) {
                    return true; // Colidiu
                }
            }
        }
        return false; // Não colidiu
    }

    reset() {
        // Reset the player's position if needed
        if (this.model) {
            this.model.position.set(0, 2, 0); // Reseta para a posição inicial
            this.model.rotation.set(0, 0, 0); 
        }
        this.bullets = []; // Limpa as balas
    }

    destroy(){
        if(this.model){
            this.scene.remove(this.model);
            this.model = null;
        }
    }
}

// Exportação padrão
export default Player;
