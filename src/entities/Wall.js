import * as THREE from 'three';

class Wall {
    constructor(scene, width, height, depth, position) {
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.wallMesh = new THREE.Mesh(this.geometry, this.material);
        this.wallMesh.position.set(position.x, position.y, position.z);
        scene.add(this.wallMesh);

        // Define a velocidade da parede
        this.speed = 0.05; // Ajuste a velocidade conforme necessário
    }

    // Método que atualiza a posição da parede para tentar acertar o jogador
    updatePosition(player) {
        const playerPosition = player.model.position.clone(); // Clona a posição do jogador
        
        // Calcula a direção da parede em relação ao jogador
        const direction = new THREE.Vector3();
        direction.subVectors(playerPosition, this.wallMesh.position).normalize();

        // Move a parede na direção do jogador
        this.wallMesh.position.add(direction.multiplyScalar(this.speed)); // Move a parede em direção ao jogador

        // Se a parede passar da posição do jogador, reinicie-a em uma nova posição
        if (this.wallMesh.position.distanceTo(playerPosition) < 1) { // Se a parede estiver próxima do jogador
            console.log("A parede atingiu o jogador!");
            // Aqui você pode implementar alguma lógica, como reiniciar o jogo ou diminuir a vida do jogador.
        }

        // Reinicia a parede em uma nova posição atrás do jogador
        if (this.wallMesh.position.z > playerPosition.z + 60) {
            this.wallMesh.position.z = playerPosition.z - 60; // Reinicia a parede atrás do jogador
            this.wallMesh.position.y = Math.random() * 2 + 1; // Pode variar a altura de reinício
        }
    }
}

export default Wall;
