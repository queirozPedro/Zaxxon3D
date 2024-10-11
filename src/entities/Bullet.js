import * as THREE from 'three'

class Bullet{
    constructor(scene, spawnPosition, isPlayerBullet, direction){
        this.scene = scene;
        this.isPlayerBullet = isPlayerBullet;
        this.direction = direction;
        this.maxZLimit = 260;
        this.mimZLimit = -40;
        this.xLimitVariation = 14;
        this.create(spawnPosition)
    }

    create(spawnPosition){
        const geometry = new THREE.BoxGeometry(
            (this.direction / 90) % 2 != 0? 0.2 : 0.8, 
            0.2, 
            (this.direction / 90) % 2 == 0? 0.2 : 0.8
        );
        const color = this.isPlayerBullet? 0x00fffff: 0xff0000;
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.bullet = new THREE.Mesh(geometry, material)

        this.bullet.position.copy(spawnPosition)
        this.bullet.position.y += 0.5
        this.scene.add(this.bullet)
    }

    update(){
        if(this.bullet){
            if(this.isPlayerBullet){
                this.bullet.position.z += 0.5
            }
            else{
                if(this.direction == 90){
                    this.bullet.position.z -= 0.5
                } else if(this.direction == 180){
                    this.bullet.position.x -= 0.5
                    this.bullet.position.z -= 0.25
                } else if(this.direction == 270){
                    this.bullet.position.z += 0.5
                } else if(this.direction == 0){
                    this.bullet.position.x += 0.5
                    this.bullet.position.z -= 0.25
                } 
            }
            this.destroyOutBounds();
        }
    }

    destroyOutBounds(){
        if(this.bullet.position.z < this.mimZLimit || this.bullet.position.z > this.maxZLimit){
            this.scene.remove(this.bullet)
            this.bullet = null;
        } else if(this.bullet.position.x < -this.xLimitVariation || this.bullet.position.x > this.xLimitVariation){
            this.scene.remove(this.bullet)
            this.bullet = null;
        }
    }

    destroy(){
        this.scene.remove(this.bullet)
        this.bullet = null;
    }
}


export default Bullet;