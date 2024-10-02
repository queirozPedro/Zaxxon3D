import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Turret {
    constructor(scene) {
        this.model = null;
        this.load(this);
        this.scene = scene;
    }

    load(object) {
        const loader = new GLTFLoader();
    
        loader.load(
            '/src/assets/models/turret/scene.gltf',
            (gltf) => {
                object.scene.add(gltf.scene); // Use a referência correta aqui
                object.model = gltf.scene.children[0];
                object.model.scale.set(1, 1, 1);
                object.model.position.set(3, 3, 3);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            (error) => {
                console.error('An error happened', error);
            }
        );
    }
}

export default Turret;