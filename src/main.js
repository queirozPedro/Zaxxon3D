import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(-8, 10, -10);
camera.lookAt(0, 0, 0);

// Controles orbitais para teste
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Classe Player que representa o jogador
class Player {
    constructor() {
        this.model = null
        this.load(this)

        this.minHeight = 0.35; // Altura mínima (limite do chão)
        this.maxHeight = 5;   // Altura máxima (limite superior)
        this.maxWidthVariation = 9.65;   // Limites de movimentação lateral
    }

    showPosition(){
        if(this.model){
            console.log("Posição X:"+ this.model.position.x)
            console.log("Posição Y:"+ this.model.position.y)
            console.log("Posição Z:"+ this.model.position.z)
        }
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
            '/assets/SpaceShip/scene.gltf',
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

// Instanciando o player
const player = new Player();

class Wall {
    constructor() {
        this.model = null
        this.load(this)
    }

    load(object) {
        // Instantiate a loader
        const loader = new GLTFLoader();

        // Load a glTF resource
        loader.load(
            // resource URL
            '/assets/Wall/scene.gltf',
            // called when the resource is loaded
            function (gltf) {
                scene.add(gltf.scene);
                object.model = gltf.scene.children[0];
                object.model.scale.set(0.2, 0.2, 0.2);
                object.model.position.set(0, 3, 3)
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

let wall = new Wall()

class Turret {
    constructor() {
        this.model = null
        this.load(this)
    }

    load(object) {
        // Instantiate a loader
        const loader = new GLTFLoader();

        // Load a glTF resource
        loader.load(
            // resource URL
            '/assets/Turret/scene.gltf',
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

let turret = new Turret()


// Um plano que serve para marcar o chão da fase
const planeGeometry = new THREE.PlaneGeometry(20, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.z = 20;
scene.add(plane);

// Luz Ambiente
const light = new THREE.AmbientLight(0xffffff, 3);
light.position.set( 0, 5, 0)
scene.add(light)

// Função animate, que executa a cada quadro
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Um array que atribui true para as teclas que estão pressionadas
const keysPressed = {}
window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    player.movementControls(keysPressed);
});
window.addEventListener('keyup',  (event) => {
    keysPressed[event.key] = false;
});