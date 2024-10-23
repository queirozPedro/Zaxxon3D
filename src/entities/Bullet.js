import * as THREE from 'three'
import CollisionDetector from '../utils/CollisionDetector.js';

class Bullet{
    constructor(scene, position, rotation, direction, ZSpeed, isPlayerBullet, gameSpeed){
        this.scene = scene;
        this.isPlayerBullet = isPlayerBullet;
        this.direction = direction;
        this.gameSpeed = gameSpeed;
        this.maxZLimit = 260;
        this.mimZLimit = -40;
        this.xLimitVariation = 14;
        this.create(position, ZSpeed, rotation)
    }

    create(position, ZSpeed, rotation){
        const geometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
        const color = this.isPlayerBullet? 0x00fffff: 0xff0000;
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.bullet = new THREE.Mesh(geometry, material)
        
        this.bullet.position.copy(position)
        
        if(this.isPlayerBullet){
            // Para que o disparo saia do bico da nave
            this.bullet.position.z += 1.9;
            this.bullet.position.y += 0.5 - 2 * Math.cos(rotation.x);

            // Correção da orientação da bullet 
            this.bullet.rotation.z += 3 * (Math.PI / 2);
            this.bullet.rotation.x += 3 * (Math.PI / 2);
        } else {
            this.ZSpeed = ZSpeed;
            this.bullet.rotation.y = this.direction * (Math.PI/180)
            this.bullet.position.x += 3.5 * Math.cos(this.direction * (Math.PI/180))
            this.bullet.position.y += 2
            this.bullet.position.z += 3.5 * Math.sin(-this.direction * (Math.PI/180))
        }
                
        this.scene.add(this.bullet)
    }

    update(){
        if(this.bullet){
            if(this.isPlayerBullet){
                this.bullet.position.z += 0.6  * this.gameSpeed;
            }
            else{
                // Esse decréscimo serve para que o tiro acompanhe a velocidade da torreta
                this.bullet.position.z -= this.ZSpeed * this.gameSpeed; 
                this.bullet.position.z += 0.2 * Math.sin(-this.direction * (Math.PI/180)) * this.gameSpeed;
                this.bullet.position.x += 0.2 * Math.cos(-this.direction * (Math.PI/180)) * this.gameSpeed;
            }
            this.destroyOutBounds();
        }
    }

    destroyOutBounds(){
        if(this.bullet.position.z < this.mimZLimit || this.bullet.position.z > this.maxZLimit){
            this.destroy()
        } else if(this.bullet.position.x < -this.xLimitVariation || this.bullet.position.x > this.xLimitVariation){
            this.destroy()
        }
    }

    destroy(){
        this.scene.remove(this.bullet)
        this.bullet = null;
    }
}


export default Bullet;