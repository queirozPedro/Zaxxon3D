import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
import Bullet from '../entities/Bullet.js';

class Turret {
    constructor(scene, direction, position) {
        this.scene = scene
        this.direction = direction
        this.position = position
        this.model = null;
        this.bullets = [];

        this.shootInterval = 1000; // Intervalo de disparo (milissegundos)
        this.lastShootTime = 0;
        this.speed = 0.25; // Velocidade de movimento da torreta

        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();

        loader.load(
            '/src/assets/models/turret/scene.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(2, 2, 2);
                this.model.position.set(this.position.x, this.position.y, this.position.z);
                this.model.rotation.y = this.direction * 1.6;
                this.scene.add(this.model);
            },
            undefined,
            (error) => {
                console.error('Erro ao carregar o modelo:', error);
            }
        );
    }

    // Movimenta a torreta para acompanhar as paredes
    moveTurret() {
        if (this.model) {
            this.model.position.z -= this.speed; // Move a torreta no eixo Z

            // Quando a torreta sair dos limites, reseta a posição
            if (this.model.position.z < -40) {
                this.scene.remove(this.model)
                this.model = null
            }
        }
    }

    shoot(deltaTime) {
        this.lastShootTime += deltaTime;

        if (this.lastShootTime >= this.shootInterval / 1000) {
            const bullet = new Bullet(this.scene, this.model.position, false, this.direction)
            this.bullets.push(bullet)
            this.lastShootTime = 0;
        }
    }

    update(deltaTime) {
        if(this.model){
            this.moveTurret(); // Move a torreta junto com a parede
            this.shoot(deltaTime); // Controla os tiros
            for(let i = 0; i < this.bullets.length; i++){
                this.bullets[i].update()
            }
        }
    }
}

export default Turret;
