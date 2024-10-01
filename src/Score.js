class Score {
    constructor() {
        this.score = 0;
        this.scoreElement = document.createElement('div');
        this.scoreElement.style.position = 'absolute';
        this.scoreElement.style.top = '10px';
        this.scoreElement.style.left = '10px';
        this.scoreElement.style.color = 'white';
        this.scoreElement.style.fontSize = '20px';
        document.body.appendChild(this.scoreElement);
    }

    increment() {
        this.score++;
    }

    update() {
        this.scoreElement.innerText = `Score: ${this.score}`;
    }
}

export default Score;
