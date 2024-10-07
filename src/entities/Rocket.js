import * as THREE from 'three';

class Rocket {
    constructor(scene, width = 1, height = 1, depth = 4, position = { x: 0, y: 0, z: 0 }) {
        // Define a geometria, material e mesh do foguete
        this.geometry = new THREE.BoxGeometry(width, height, depth);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.rocket = new THREE.Mesh(this.geometry, this.material);

        // Define a posição inicial do foguete
        this.rocket.position.set(position.x, position.y, position.z);
        scene.add(this.rocket);

        // Define a velocidade do foguete
        this.speed = 0.1; // Ajuste a velocidade conforme necessário
    }

    // Método para atualizar a posição do foguete
    updatePosition(player) {
        const playerPosition = player.model.position.clone(); // Clona a posição do jogador

        // Calcula a direção em que o foguete deve se mover em direção ao jogador
        const direction = new THREE.Vector3();
        direction.subVectors(playerPosition, this.rocket.position).normalize();

        // Move o foguete em direção ao jogador
        this.rocket.position.add(direction.multiplyScalar(this.speed));

        // Lógica para reposicionar o foguete, se necessário
        if (this.rocket.position.distanceTo(playerPosition) < 1) { // Se o foguete atingir o jogador
            console.log("O foguete atingiu a nave do jogador!");
            this.resetPosition(player); // Você pode chamar um método para resetar ou reiniciar
        }

        // Reinicia a posição do foguete se ele sair da tela ou de uma certa distância
        if (this.rocket.position.z < -50) { // Se o foguete sair da tela
            this.resetPosition(player); // Chama o método para resetar a posição
        }
    }

    // Método para resetar a posição do foguete em relação à nave do jogador
    resetPosition(player) {
        // Define a nova posição do foguete na frente da nave do jogador
        this.rocket.position.set(player.model.position.x, player.model.position.y, player.model.position.z + 10); // Ajuste a posição como necessário
    }
}

export default Rocket;
