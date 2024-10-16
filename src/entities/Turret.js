import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Bullet from '../entities/Bullet.js';

class Turret {
    constructor(scene, direction, position) {
        this.scene = scene
        this.direction = direction
        this.position = position
        this.model = null;
        this.bullets = [];

        this.isDestroyed = false;
        this.shootInterval = 1000; // Intervalo de disparo (milissegundos)
        this.lastShootTime = 0;
        this.ZSpeed = 0.25; // Velocidade de movimento da torreta

        this.loadModel();
    }

    loadModel() {
        const loader = new GLTFLoader();

        loader.load(
            'src/assets/models/turret/Rail Gun Turret.gltf',
            (gltf) => {
                this.model = gltf.scene;
                this.model.scale.set(1.2, 1, 1.2);
                this.model.position.set(this.position.x, this.position.y + 0.3, this.position.z);
                this.model.rotation.y = (this.direction * Math.PI/180) + Math.PI / 2;
                this.scene.add(this.model);

                // Configura o modelo para projetar e receber sombras   
                this.model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                    }
                });
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
            this.model.position.z -= this.ZSpeed; // Move a torreta no eixo Z
            this.destroyOutBounds()
        }
    }

    shoot(deltaTime) {
        this.lastShootTime += deltaTime;
        
        if(!this.isDestroyed){
            if (this.lastShootTime >= this.shootInterval / 1000) {
                const bullet = new Bullet(this.scene, this.model.position, this.direction, this.ZSpeed, false)
                this.bullets.push(bullet)
                this.lastShootTime = 0;
            }
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

    destroyOutBounds(){
        // Quando a torreta sair dos limites, reseta a posição
        if (this.model.position.z < -80) {
            for(let i = 0; i < this.bullets.length; i++){
                this.scene.remove(this.bullets[i].destroy())
            }
            this.scene.remove(this.model)
            this.model = null
        }
    }
    
    wallCollisionCheck(walls) {
        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].wallCollisionCheck(walls)){
                this.bullets[i].destroy()
            }
        }
        this.scene.remove(this.bullet)
        this.bullet = null;
    }

    enemyBulletCollisionCheck(enemy){
        for(let i = 0; i < this.bullets.length; i++){
            if(this.bullets[i].enemyCollisionCheck(enemy)){
                return true;
            }
        }
        return false;
    }

    shootDestroy(){
        if (this.model) {
            this.scene.remove(this.model)
            this.isDestroyed = true;
        }
    }

    getIsDestroyed(){
        return this.isDestroyed;
    }
}

export default Turret;
