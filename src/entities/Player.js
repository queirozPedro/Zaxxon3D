import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

class Player {
    constructor(scene) {
        this.model = null;
        this.load(this);
        this.scene = scene;

        this.minHeight = 0.35; // Altura mínima (limite do chão)
        this.maxHeight = 5;   // Altura máxima (limite superior)
        this.maxWidthVariation = 9.65;   // Limites de movimentação lateral
    }

    movementControls(keysPressed) {
        if(keysPressed['w'] || keysPressed['ArrowUp']){
            if (this.model.position.y < this.maxHeight) this.model.position.y += 0.1;
            if(keysPressed['a'] || keysPressed['ArrowLeft']){
                if (this.model.position.x < this.maxWidthVariation) this.model.position.x += 0.1;
            }
            if(keysPressed['d'] || keysPressed['ArrowRight']){
                if (this.model.position.x > -this.maxWidthVariation) this.model.position.x -= 0.1;
            }
        }
        if(keysPressed['s'] || keysPressed['ArrowDown']){
            if (this.model.position.y > this.minHeight) this.model.position.y -= 0.1;
            if(keysPressed['a'] || keysPressed['ArrowLeft']){
                if (this.model.position.x < this.maxWidthVariation) this.model.position.x += 0.1;
            }
            if(keysPressed['d'] || keysPressed['ArrowRight']){
                if (this.model.position.x > -this.maxWidthVariation) this.model.position.x -= 0.1;
            }
        }
        if(keysPressed['a'] || keysPressed['ArrowLeft']){
            if (this.model.position.x < this.maxWidthVariation) this.model.position.x += 0.1;
        }
        if(keysPressed['d'] || keysPressed['ArrowRight']){
            if (this.model.position.x > -this.maxWidthVariation) this.model.position.x -= 0.1;
        }
    }

    load(object) {
        // Instantiate a loader
        const loader = new GLTFLoader();

        // Load a glTF resource
        loader.load(
            // resource URL
            '/assets/models/spaceship/scene.gltf',
            // called when the resource is loaded
            function (gltf) {
                scene.add(gltf.scene);
                object.model = gltf.scene.children[0];
                object.model.scale.set(0.5, 0.5, 0.5);

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

export default Player;