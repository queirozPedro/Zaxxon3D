import * as THREE from 'three';

class Obstacle {
    constructor(type) {
        this.type = type;

        if (this.type === 'ship') {
            this.geometry = new THREE.BoxGeometry(1, 0.5, 0.5);
            this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        } else if (this.type === 'wall') {
            this.geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
            this.material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
        } else if (this.type === 'turret') {
            this.geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
            this.material = new THREE.MeshBasicMaterial({ color: 0xff00ff });
        }

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.resetPosition();
    }

    move() {
        this.mesh.position.z += 0.1; // Mover o obstáculo para frente
    }

    resetPosition() {
        this.mesh.position.z = -20; // Reiniciar a posição
        this.mesh.position.x = Math.random() * 10 - 5; // Nova posição aleatória
    }
}

export default Obstacle;
