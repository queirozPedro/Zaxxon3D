import * as THREE from 'three';

class Wall {
    constructor(scene) {
        this.scene = scene;
        this.wall = []
        const geometry = new THREE.BoxGeometry(7, 4, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.generateWall(geometry, material) 
    }  

    generateWall(geometry, material){
        for(let i = -1 ; i < 1; i++){
            for(let j = 0; j < 2; j++){
                const wallSegment = new THREE.Mesh(geometry, material);
                wallSegment.position.set(i, j + 2, 250);
                this.scene.add(wallSegment)
                this.wall.push(wallSegment)
            }
        }
    }

    controlWall(){
        for(let i = 0; i < this.wall.length; i++){
            if(this.wall[i]){
                this.moveForward(i)
                this.destroyOutBounds(i)
            }
        }
    }

    moveForward(i){
        this.wall[i].position.z -= 1;
    }

    destroyOutBounds(i){
        if(this.wall[i].position.z < -40){
            this.scene.remove(this.wall[i])
            this.wall[i] = null;
        }
    }
}

export default Wall;
