import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Player {
    constructor(scene) {
        this.model = null;
        this.scene = scene;
        this.minHeight = 0.4; // Altura mínima (limite do chão)
        this.maxHeight = 10;    // Altura máxima (limite superior)
        this.maxWidthVariation = 13.5; // Limites de movimentação lateral
        this.load();  // Chama o método de carregamento do modelo
    }

    movementControls(keysPressed) {
        // impede que o modelo seja referenciado sem nem existir
        if(!this.model) return;

        // Controla o movimento para cima
        if(keysPressed['w'] || keysPressed['ArrowUp']) {
            if (this.model.position.y < this.maxHeight) {
                // movimento
                this.model.position.y += 0.1;
                if(this.model.rotation.x > -1.9){
                    // inclinação
                    this.model.rotation.x -= 0.02;
                }
            } 
        } else if(this.model.rotation.x < -1.57){
            this.model.rotation.x += 0.05;
        }
        
        // Controla o movimento para baixo
        if(keysPressed['s'] || keysPressed['ArrowDown']) {
            if (this.model.position.y > this.minHeight) {
                this.model.position.y -= 0.1;
                if(this.model.rotation.x < -1.2){
                    this.model.rotation.x += 0.02;
                }
            }
        } else if(this.model.rotation.x > -1.57){
            this.model.rotation.x -= 0.05;
        }

        // Controla o movimento para esquerda
        if(keysPressed['a'] || keysPressed['ArrowLeft']) {
            if (this.model.position.x < this.maxWidthVariation){
                this.model.position.x += 0.1;
                if(this.model.rotation.y < 0.3){
                    this.model.rotation.y += 0.02;
                }
            }    
        } else {
            if(this.model.rotation.y > 0){
                this.model.rotation.y -= 0.05;
            }
        }

        // Controla o movimento para direita
        if(keysPressed['d'] || keysPressed['ArrowRight']) {
            if (this.model.position.x > -this.maxWidthVariation){
                this.model.position.x -= 0.1;
                if(this.model.rotation.y > -0.3){
                    this.model.rotation.y -= 0.02;
                }
            }
        } else if(this.model.rotation.y < 0){
            this.model.rotation.y += 0.05;
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
                this.model.position.set(0, 2, 0)
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
