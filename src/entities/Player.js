import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Player {
    constructor(scene) {
        this.model = null;
        this.scene = scene;  // Referência à cena recebida no construtor
        this.minHeight = 0.35; // Altura mínima (limite do chão)
        this.maxHeight = 8;    // Altura máxima (limite superior)
        this.maxWidthVariation = 13.5; // Limites de movimentação lateral
        this.load();  // Chama o método de carregamento do modelo
    }

    movementControls(keysPressed) {
        if (this.model) {
            if(keysPressed['w'] || keysPressed['ArrowUp']) {
                if (this.model.position.y < this.maxHeight) this.model.position.y += 0.1;
                if(keysPressed['a'] || keysPressed['ArrowLeft']) {
                    if (this.model.position.x < this.maxWidthVariation) this.model.position.x += 0.1;
                }
                if(keysPressed['d'] || keysPressed['ArrowRight']) {
                    if (this.model.position.x > -this.maxWidthVariation) this.model.position.x -= 0.1;
                }
            }
            if(keysPressed['s'] || keysPressed['ArrowDown']) {
                if (this.model.position.y > this.minHeight) this.model.position.y -= 0.1;
                if(keysPressed['a'] || keysPressed['ArrowLeft']) {
                    if (this.model.position.x < this.maxWidthVariation) this.model.position.x += 0.1;
                }
                if(keysPressed['d'] || keysPressed['ArrowRight']) {
                    if (this.model.position.x > -this.maxWidthVariation) this.model.position.x -= 0.1;
                }
            }
            if(keysPressed['a'] || keysPressed['ArrowLeft']) {
                if (this.model.position.x < this.maxWidthVariation) this.model.position.x += 0.1;
            }
            if(keysPressed['d'] || keysPressed['ArrowRight']) {
                if (this.model.position.x > -this.maxWidthVariation) this.model.position.x -= 0.1;
            }
        }
    }

    load() {
        const loader = new GLTFLoader();
    
        loader.load(
            // Caminho correto para o modelo
            '/src/assets/models/spaceship/scene.gltf',  // Corrigido
    
            // Chamado quando o recurso é carregado
            (gltf) => {
                this.scene.add(gltf.scene);
                this.model = gltf.scene.children[0];
                this.model.scale.set(0.8, 1, 0.8);
            },
    
            // Progresso do carregamento
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
    
            // Chamado quando ocorre um erro no carregamento
            (error) => {
                console.error('Erro ao carregar o modelo:', error);
            }
        );
    }
}

export default Player;
