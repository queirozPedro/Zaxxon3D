import * as THREE from 'three';

class SoundManager {
    constructor(camera) {
        this.listener = new THREE.AudioListener();
        camera.add(this.listener);
        this.sound = new THREE.Audio(this.listener);
        this.audioLoader = new THREE.AudioLoader();
        this.audioLoader.load('sounds/sound.mp3', (buffer) => {
            this.sound.setBuffer(buffer);
            this.sound.setLoop(false);
            this.sound.setVolume(0.5);
        });
    }

    playSound() {
        this.sound.play();
    }
}

export default SoundManager;
