import * as THREE from 'three';

class Ground {
    constructor(scene) {
        // Carregar a textura do chão
        const loader = new THREE.TextureLoader();
        const texture = loader.load('/src/assets/textures/ground.png', (texture) => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(1, 20);  // Repetir a textura no eixo Y
        });

        // Criar o material usando a textura
        this.groundMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });

        // Definir a geometria do chão
        const groundGeometry = new THREE.PlaneGeometry(30, 600);

        // Criar a malha do chão com geometria e material
        this.ground = new THREE.Mesh(groundGeometry, this.groundMaterial);

        // Rotacionar e posicionar o chão
        this.ground.rotation.x = -Math.PI / 2;
        this.ground.position.z = 80;

        // Adicionar o chão à cena
        scene.add(this.ground);
    }

    // Função para mover a textura do chão
    update(deltaTime) {
        this.groundMaterial.map.offset.y -= deltaTime * 0.5;  // Ajuste a velocidade aqui
    }
}

export default Ground;
