import * as THREE from 'three';

class Wall {
    constructor(scene) {
        this.scene = scene;
        this.wall = []
        this.load()
    }  

    load() {
        const geometry = new THREE.BoxGeometry(6, 4, 0.5);
        const loader = new THREE.TextureLoader();
        const texture = loader.load('/src/assets/textures/texturaParede.png');
        const material = new THREE.MeshBasicMaterial( {map: texture} );
        this.generateWall(geometry, material) 
    }

    generateWall(geometry, material){
        for(let i = -12 ; i <= 12; i += 6){
            for(let j = 2; j <= 10; j += 4){
                if(!(i == 0 && j == 10)){
                    if(!(i == -6 && j == 10)){    
                        const wallSegment = new THREE.Mesh(geometry, material);
                        wallSegment.position.set(i, j, 260);
                        this.scene.add(wallSegment)
                        this.wall.push(wallSegment)
                    }
                }
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
        this.wall[i].position.z -= 0.25;
    }

    destroyOutBounds(i){
        if(this.wall[i].position.z < -40){
            this.scene.remove(this.wall[i])
            this.wall[i] = null;
        }
    }
}

export default Wall;
