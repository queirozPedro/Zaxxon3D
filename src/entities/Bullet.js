import * as THREE from 'three'

class Bullet{
    constructor(scene, position, rotation, direction, ZSpeed, isPlayerBullet){
        this.scene = scene;
        this.isPlayerBullet = isPlayerBullet;
        this.direction = direction;
        this.maxZLimit = 260;
        this.mimZLimit = -40;
        this.xLimitVariation = 14;
        this.create(position, rotation, ZSpeed)
    }

    create(position, rotation, ZSpeed){
        const geometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
        const color = this.isPlayerBullet? 0x00fffff: 0xff0000;
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.bullet = new THREE.Mesh(geometry, material)
        
        this.bullet.position.copy(position)
        this.bullet.rotation.copy(rotation) 

        if(this.isPlayerBullet){
            // Essa é uma solução temporária. A posição e orientação do tiro vão seguir a inclinação da nave
            this.bullet.position.y += 0.5;
            this.bullet.position.z += 2;   
            this.bullet.rotation.z += 270 * (Math.PI/180)
        } else{
            this.ZSpeed = ZSpeed;
            this.bullet.position.x += 1.7 * Math.cos(this.direction * (Math.PI/180))
            this.bullet.position.y += 0.7
            this.bullet.position.z += 1.7 * Math.sin(-this.direction * (Math.PI/180))
        }
            
        this.scene.add(this.bullet)
    }

    update(){
        if(this.bullet){
            if(this.isPlayerBullet){
                this.bullet.position.z += 0.6
            }
            else{
                // Esse decréscimo serve para que o tiro acompanhe a velocidade da torreta
                this.bullet.position.z -= this.ZSpeed; 
                this.bullet.position.z += 0.2 * Math.sin(-this.direction * (Math.PI/180));
                this.bullet.position.x += 0.2 * Math.cos(-this.direction * (Math.PI/180));
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