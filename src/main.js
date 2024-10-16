import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import Background from './entities/Background.js';
import Player from './entities/Player.js';
import Ground from './entities/Ground.js';
import Wall from './entities/Wall.js';
import Turret from './entities/Turret.js';

// Cena, câmera e renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Configurações que permitem ao render usar sombras
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Ajustando a câmera para a perspectiva do Zaxxon
camera.position.set(-12, 19, -17);
camera.lookAt(0, 0, 0);

// Controles orbitais para teste
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

// Carrega o chão e o background, e permite ao chão receber sombras
const background = new Background(scene, 8);
const ground = new Ground(scene);
ground.ground.receiveShadow = true;

/**
 * A Luz pontual ficará sobre a nave, para projetar sua sombra sobre o chão da fase.
 * A luz ambiente serve apenas para que a parte escura não fique estranha
 */
const pointLight = new THREE.PointLight(0xffffff, 10000, 10000);
pointLight.position.set(0, 100, 0);
// Os Objetos que recebem esta luz poderam projetar sombra
pointLight.castShadow = true;
// A wifth e o height serão a resolução da sombra, nesse caso 1024x1024 pixels
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
scene.add(pointLight)
// Luz ambiente fraquinha pra não ficar escuro demais
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight);

// Dicionário que atribui true para as teclas que estão pressionadas
const keysPressed = {};
window.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
});
// Adiciona false para as teclas que não estão mais apertadas
window.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
});

// Relógio que será usado para medir o deltaTime
const clock = new THREE.Clock();

const player = new Player(scene);
const walls = []
const turrets = []
let tempoDecorrido = 0
let intervaloDeTempo = 0;


function animate() {
    requestAnimationFrame(animate);
    
    // Atualiza a cena
    update()
    renderer.render(scene, camera);    
}

/**
 * A função spawnObjects instancia os objetos na cena de maneira quase aleatória
 */
function spawnObjects(){
    const camadas = 3;
    const murosQuebrados = Math.round(Math.random() * 2 + 3);
    const spawnPointZ = 260 + Math.random() * 2;
    const wall = new Wall(scene, camadas, murosQuebrados, spawnPointZ);
    walls.push(wall)
    
    for(let i = 0; i < Math.round(Math.random() * 2 + 1); i++){
        const direction = (Math.random() * 18) * 20;
        const spawnPointX = (Math.random() * 20) - 10;
        const turret = new Turret(scene, direction , {x:spawnPointX, y:0, z:spawnPointZ + (i+1)*15});
        turrets.push(turret)
    }
}


function update(){
    // Calcula o tempo entre frames 
    const deltaTime = clock.getDelta();

    tempoDecorrido += deltaTime;

    if(tempoDecorrido >= intervaloDeTempo){
        spawnObjects()

        tempoDecorrido = 0;

        intervaloDeTempo = Math.random() * 10 + 5;
    }

    // Atualizando o jogador e o environment
    player.update(keysPressed);
    ground.update(deltaTime);
    background.update(); 

    // Percorre os muros checando as colisões
    for(let i = 0; i < walls.length; i++){
        if(walls[i].wall){
            walls[i].update()
        }
        // Testa a colisão entre o player e os tiros contra o muro 
        if (player.wallCollisionCheck(walls[i].wall)) {
            endGame();
        }
        
    }
    
    for(let i = 0; i < turrets.length; i++){
        if(turrets[i].model){
            turrets[i].update(deltaTime)
            // Testa a colisão entre os tiro da torreta e os muros
            for(let j = 0; j < walls.length; j++){
                turrets[i].wallCollisionCheck(walls[j].wall);
            }
        }

        // Testa a colisao entre o jogador e a torreta
        if(player.turretCollisionCheck(turrets[i]) && !turrets[i].getIsDestroyed()){
            endGame();
        }

        // Testa a colisão entre o tiro do jogador e alguma torreta
        if(!turrets[i].getIsDestroyed()){
            if(player.enemyBulletCollisionCheck(turrets[i].model)){
                turrets[i].shootDestroy()
            }
        }

        // Testa as colisões entre o tiro da torreta e o jogador
        if(turrets[i].enemyBulletCollisionCheck(player.model)){
            endGame();
        }
    }
}


// Função para reiniciar o jogo
function endGame() {
    player.destroy();
}

// Inicia a animação e o jogo
animate();
