import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';

class Turret {
    constructor(scene, target) {
        this.scene = scene;
        this.target = target; // A nave será o alvo
        this.model = null;
        this.projectiles = [];
        this.shootInterval = 1000; // Intervalo de disparo (milissegundos)
        this.lastShootTime = 0;
        this.speed = 0.25; // Velocidade de movimento da torreta
        this.initialZ = 300; // Posição inicial da torreta, logo atrás da parede

        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();

        loader.load(
            '/src/assets/models/turret/scene.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(1, 1, 1);
                this.model.position.set(0, 0.7, this.initialZ); // Posição inicial atrás da parede
                this.model.rotation.set.y = 90;
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
                this.model.position.z = this.initialZ; // Reseta a posição inicial
            }
        }
    }

    createProjectile() {
        const geometry = new THREE.SphereGeometry(0.2, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const projectile = new THREE.Mesh(geometry, material);

        if (this.model) {
            projectile.position.copy(this.model.position);
            this.scene.add(projectile);
            this.projectiles.push(projectile);
        }
    }

    updateProjectiles() {
        for (let i = 0; i < this.projectiles.length; i++) {
            const projectile = this.projectiles[i];
            if (projectile) {
                projectile.position.z -= 0.5; // Velocidade do projétil

                if (projectile.position.z < -40) {
                    this.scene.remove(projectile);
                    this.projectiles[i] = null;
                }
            }
        }

        this.projectiles = this.projectiles.filter(p => p !== null);
    }

    shoot(deltaTime) {
        this.lastShootTime += deltaTime;

        if (this.lastShootTime >= this.shootInterval / 1000) {
            this.createProjectile();
            this.lastShootTime = 0;
        }
    }

    update(deltaTime) {
        this.moveTurret(); // Move a torreta junto com a parede
        this.shoot(deltaTime); // Controla os tiros
        this.updateProjectiles(); // Atualiza projéteis
    }
}

export default Turret;
