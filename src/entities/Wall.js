import * as THREE from 'three';

class Wall {
    constructor(scene, camadas, murosQuebrados, spawnPointZ) {
        this.scene = scene;
        this.camadas = camadas*4;
        this.murosQuebrados = murosQuebrados;
        this.spawnPointZ = spawnPointZ;
        this.wall = [];
        this.load();
    }  

    load() {
        const geometry = new THREE.BoxGeometry(6, 4, 1);
        const loader = new THREE.TextureLoader();
        const texture = loader.load('/src/assets/textures/wallTexture.png');
        const material = new THREE.MeshPhongMaterial({ map: texture });
        this.generateWall(geometry, material);
    }

    generateWall(geometry, material) {
        for(let i = -12; i <= 12; i += 6) {
            for(let j = 2; j <= this.camadas; j += 4) {
                const wallSegment = new THREE.Mesh(geometry, material);
                wallSegment.receiveShadow = true;
                wallSegment.position.set(i, j, this.spawnPointZ);
                this.scene.add(wallSegment);
                this.wall.push(wallSegment);
            }
        }
        for(let i = 0; i < this.murosQuebrados; i++){
            this.destroySegment(Math.round(Math.random() * this.wall.length))
        }
    }

    update() {
        for (let i = 0; i < this.wall.length; i++) {
            if (this.wall[i]) {
                this.moveForward(i);
                this.destroyOutBounds(i);
            }
        }
    }

    moveForward(i) {
        this.wall[i].position.z -= 0.25;
    }

    destroyOutBounds(i) {
        if (this.wall[i].position.z < -40) {
            this.scene.remove(this.wall[i]);
            this.wall[i] = null; // Remove o segmento da parede
        }
    }

    destroy(){
        for(let i = 0; i < this.wall.length; i++){
            this.scene.remove(this.wall[i]);
            this.wall[i] = null; // Remove o segmento da parede
        }
    }

    destroySegment(i){
        this.scene.remove(this.wall[i]);
        this.wall[i] = null;
    }

}

export default Wall;
