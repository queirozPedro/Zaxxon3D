import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(8, 10, 10);
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
        
        // definir a altura inicial 
        // this.position.y = this.minHeight;
    }

    load(object){
        // Instantiate a loader
        const loader = new GLTFLoader();
        
        // Load a glTF resource
        loader.load(
            // resource URL
            '/assets/models/scene.gltf',
            // called when the resource is loaded
            function ( gltf ) {
        
                scene.add( gltf.scene );
                object.model = gltf.scene.children[0];
        
                gltf.animations; // Array<THREE.AnimationClip>
                gltf.scene; // THREE.Group
                gltf.scenes; // Array<THREE.Group>
                gltf.cameras; // Array<THREE.Camera>
                gltf.asset; // Object
        
            },
            // called while loading is progressing
            function ( xhr ) {
        
                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) {
        
                console.log( 'An error happened' );
        
            }
        );
    }

    movementControls(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                if (this.position.y < this.maxHeight) {
                    this.position.y += 0.1;
                }
                break;
            case 'ArrowDown':
            case 's':
                if (this.position.y > this.minHeight) {
                    this.position.y -= 0.1;
                }
                break;
            case 'ArrowLeft':
            case 'a':
                if(this.position.x > -this.maxWidthVariation)
                    this.position.x -= 0.1;
                break;
            case 'ArrowRight':
            case 'd':
                if(this.position.x < this.maxWidthVariation)
                    this.position.x += 0.1;
                break;
        }
    }
}

const player = new Player();

// Um plano que serve para marcar o chão da fase
const planeGeometry = new THREE.PlaneGeometry(20, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.z = -20;
scene.add(plane);


// Função animate, que executa a cada quadro
function animate() {
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// Listener para capturar pressionamentos de tecla
window.addEventListener('keydown', (event) => {
    player.movementControls(event);
});
