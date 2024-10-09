import * as THREE from 'three'

class Bullet{
    constructor(scene, playerPosition, playerRotation, enemyBullet){
        this.scene = scene
        this.enemyBullet = enemyBullet
        this.sceneZLimit = 260 // Será usado para limitar a distância da bullet
        this.load(playerPosition, playerRotation)
    }

    load(playerPosition, playerRotation){
        const geometry = new THREE.BoxGeometry(0.2, 0.3, 0.2);
        const material = new THREE.MeshBasicMaterial({ color: 0xf0c016 });
        this.bullet = new THREE.Mesh(geometry, material)

        this.bullet.position.copy(playerPosition)
        this.bullet.position.y += 0.5
        this.bullet.rotation.copy(playerRotation)

        this.scene.add(this.bullet)
    }

    update(){
        if(this.bullet){
            this.bullet.position.z += 0.5
            this.destroyOutBounds();
        }
    }

    destroyOutBounds(){
        if(this.bullet.position.z > 260){
            this.scene.remove(this.bullet)
            this.bullet = null;
        }
    }
}

export default Bullet;