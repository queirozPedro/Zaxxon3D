import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Turret {
    constructor(scene) {
        this.model = null;
        this.load(this);
        this.scene = scene;
    }

    load(object) {
        // Instantiate a loader
        const loader = new GLTFLoader();

        // Load a glTF resource
        loader.load(
            // resource URL
            '/assets/models/turret/scene.gltf',
            // called when the resource is loaded
            function (gltf) {
                scene.add(gltf.scene);
                object.model = gltf.scene.children[0];
                object.model.scale.set(1, 1, 1);
                object.model.position.set(3, 3, 3)
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object

            },
            // called while loading is progressing
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {

                console.log('An error happened');

            }
        );
    }
}

export default Turret;