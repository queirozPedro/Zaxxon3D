import * as THREE from 'three'

class Bullet{
    constructor(scene, playerPosition, playerRotation, isPlayerBullet, direction){
        this.scene = scene
        this.isPlayerBullet = isPlayerBullet
        this.direction = direction
        this.sceneZLimit = 260 // Será usado para limitar a distância da bullet
        this.create(playerPosition, playerRotation)
    }

    create(playerPosition, playerRotation){
        const geometry = new THREE.BoxGeometry(this.direction != 1.6? 0.3: 0.2, 0.2, this.direction == 1.6? 0.3: 0.2);
        const color = this.isPlayerBullet? 0xf6ff00: 0xff0000;
        const material = new THREE.MeshBasicMaterial({ color: color });
        this.bullet = new THREE.Mesh(geometry, material)

        this.bullet.position.copy(playerPosition)
        this.bullet.position.y += 0.5
        this.bullet.rotation.copy(playerRotation)

        this.scene.add(this.bullet)
    }

    update(){
        if(this.bullet){
            if(this.isPlayerBullet){
                this.bullet.position.z += 0.5
            }
            else{
                if(this.direction == 1.6){
                    this.bullet.position.z -= 0.5
                } else {
                    this.bullet.position.x -= 0.5
                }
            }
            this.destroyOutBounds();
        }
    }

    destroyOutBounds(){
        if((this.bullet.position.z > 260 || this.bullet.position.z < -40) || this.bullet.position.x < -14){
            this.scene.remove(this.bullet)
            this.bullet = null;
        }
    }
}

export default Bullet;