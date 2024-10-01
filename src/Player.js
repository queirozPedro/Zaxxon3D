import * as THREE from 'three';

class Player {
    constructor() {
        const playerGeometry = new THREE.BoxGeometry(1, 0.5, 0.5);
        const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.mesh = new THREE.Mesh(playerGeometry, playerMaterial);
        this.mesh.position.z = -5; // Posição inicial do jogador
    }

    move(key) {
        switch (key) {
            case 'ArrowUp':
                this.mesh.position.z += 0.1;
                break;
            case 'ArrowDown':
                this.mesh.position.z -= 0.1;
                break;
            case 'ArrowLeft':
                this.mesh.position.x -= 0.1;
                break;
            case 'ArrowRight':
                this.mesh.position.x += 0.1;
                break;
        }
    }

    rotate() {
        this.mesh.rotation.y += 0.01;
    }
}

export default Player;
