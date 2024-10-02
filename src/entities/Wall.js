import * as THREE from 'three';

class Wall {
    constructor(scene, width, height, depth, position) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const wallMesh = new THREE.Mesh(geometry, material);
        wallMesh.position.set(position.x, position.y, position.z);
        scene.add(wallMesh);
    }
}

export default Wall;
