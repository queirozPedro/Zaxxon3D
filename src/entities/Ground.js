import * as THREE from 'three';

class Ground {
    constructor(scene) {
        const groundGeometry = new THREE.PlaneGeometry(30, 600);
        const groundMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.z = 80;
        scene.add(ground);
    }
}

export default Ground;