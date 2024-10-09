import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Background{
    constructor(scene, numberLayers){
        this.scene = scene;
        this.numberLayers = numberLayers;   
        this.start()
    }
    
    start(){
        this.models = []
        this.rotation = []

        for(let i = 0; i < this.numberLayers; i++){
            this.load();
            this.rotation.push(Math.random() / 10000);
            this.rotation.push(Math.random() / 10000);
            this.rotation.push(Math.random() / 10000);    
        }
    }

    update(){
        for(let i = 0; i < this.models.length; i++){
            this.models[i].rotation.x += this.rotation[i + 0]
            this.models[i].rotation.y += this.rotation[i + 1]
            this.models[i].rotation.z += this.rotation[i + 2]
        }
    }

    load() {
        const loader = new GLTFLoader();    
    
        loader.load(
            '/src/assets/models/background/scene.gltf', 
    
            // Chamado quando o recurso é carregado
            (gltf) => {
                this.scene.add(gltf.scene);
                const model = gltf.scene.children[0];
                model.scale.set(Math.random() + this.numberLayers, Math.random()+ this.numberLayers, Math.random() + this.numberLayers);
                model.position.set(0, 0, 100);
                model.rotation.set(Math.random(), Math.random(), Math.random())
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

export default Background;