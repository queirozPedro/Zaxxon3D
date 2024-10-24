import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
    
class Alien {
    constructor(scene){
        this.scene = scene;
        this.load();
    }
    load() {
        const loader = new GLTFLoader();    
    
        loader.load(
            './assets/models/alien/scene.gltf', 
    
            // Chamado quando o recurso é carregado
            (gltf) => {

                this.scene.add(gltf.scene);
                const model = gltf.scene.children[0];
                model.position.set(0,5,0);
                model.scale.set(0.8,0.8,0.5);
                this.models.push(model)
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
export default Alien;