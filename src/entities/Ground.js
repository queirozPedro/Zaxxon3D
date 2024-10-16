    import * as THREE from 'three';

    class Ground {
        constructor(scene) {
            this.load()
            const groundGeometry = new THREE.PlaneGeometry(30, 300);
            this.ground = new THREE.Mesh(groundGeometry, this.groundMaterial);

            this.ground.rotation.x = -Math.PI / 2;
            this.ground.position.z = 110;

            scene.add(this.ground);
        }

        load() {
            const loader = new THREE.TextureLoader();
            const texture = loader.load('src/assets/textures/ground.png', (texture) => {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(1, 20);
            });

            // Criar o material usando a textura
            this.groundMaterial = new THREE.MeshStandardMaterial({
                map: texture,
                side: THREE.DoubleSide
            });
        }

        // Função para mover a textura do chão
        update(deltaTime) {
            this.groundMaterial.map.offset.y -= deltaTime * 1;  // Ajuste a velocidade aqui
        }
    }

    export default Ground;
