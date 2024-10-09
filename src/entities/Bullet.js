import * as THREE from 'three'

class Bullet{
    constructor(scene, playerPosition, playerRotation){
        this.scene = scene
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
        this.bullet.position.z += 0.5
    }
}

export default Bullet;