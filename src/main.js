import * as THREE from 'three';

/**
 * Existem vários tipos de cameras no three.js, nesse caso vamos usar a câmera perspectiva.
 * O primeiro atributo (75) é o campo de visão (FOV) da câmera, que é em ângulos.
 * O segundo é a proporção da tela, geralmente obtida através da largunra da tela dividida pela altura.
 * Os dois ultimos são o near e o far, eles são a distância de inicio e de fim em que os objetos
 * serão renderizados a partir da posição da câmera.
 *
 * O renderer (Renderizador), responsável por transformar os dados em uma representação visual.
 * Para criar um renderer é precisamos definir um Size (tamanho) que será o tamanho que ele irá renderizar
 * nosso apicativo.
 *  
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do zaxxon
camera.position.set(8, 10, 10);
camera.lookAt(0, 0, 0);

// Os controles Orbitais servem para testar se está tudo ok
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();


/**
 * Classe Player que representa o jogador e deve ter todos os atributos da nave, como vida, 
 * velocidade, cadência de tiros, etc.
 */
class Player{
    constructor(player){
        this.player = player
    }

    movementControls(event){
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.player.position.y += 0.1;
                break;
            case 'ArrowDown':
            case 's':
                this.player.position.y -= 0.1;
                break;
            case 'ArrowLeft':
            case 'a':
                this.player.position.x -= 0.1;
                break;
            case 'ArrowRight':
            case 'd':
                this.player.position.x += 0.1;
                break;
        }
    } 
}

// A declaração do player
const playerGeometry = new THREE.BoxGeometry(0.5, 0.5, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new Player(new THREE.Mesh(playerGeometry, playerMaterial));
scene.add(player.player);


// Os obstáculos e o plano que representa o chão da fase

// // Criando obstáculos que serão usados para exemplificar
// const obstaculoGeometry = new THREE.BoxGeometry(1, 1, 1);
// const obstaculoMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const obstaculos = [];
// for (let i = 0; i < 5; i++) {
//     const obstaculo = new THREE.Mesh(obstaculoGeometry, obstaculoMaterial);
//     // Math.random gera um número decimal de 0 à 1, multiplicar o resultado por 10 faz com que seja retornado um valor no intervalo de 0 à 10.
//     obstaculo.position.set(Math.random() * 10 - 5, Math.random() * 3 + 0.5, Math.random() * -60);
//     obstaculos.push(obstaculo);
//     scene.add(obstaculo);
// }

// Um plano que serve de para marcar o chão da fase
const planeGeometry = new THREE.PlaneGeometry(20, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.z = -20
scene.add(plane);


// Função animate, que executa a cada quadro
function animate() {

    // // Move os obstáculos
    // obstaculos.forEach(obstaculo => {
    //     obstaculo.position.z += 0.1; 
    //     if (obstaculo.position.z > 20) {
    //         obstaculo.position.z = -60; 
    //         obstaculo.position.x = Math.random() * 10 - 5;
    //     }
    // });

    renderer.render(scene, camera);
}
renderer.setAnimationLoop( animate );

// Um listener, que 'escuta' cada pressionar de tecla e dispara um gatilho
window.addEventListener('keydown', (event) => {
    player.movementControls(event)
});