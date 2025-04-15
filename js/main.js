class PlayerMover {
    constructor(playerElementId, boardElementId) {
        this.playerElm = document.getElementById(playerElementId);
        this.boardElm = document.getElementById(boardElementId);

        this.positionX = 0;
        this.positionY = 0;
        this.direction = null;
        this.intervalId = null;
        this.isAlive = true;

        this.validDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
        this.obstacles = [];  
        this.occupiedPositions = []; 
        this.hasMoved = false; 

        this.movePlayer = this.movePlayer.bind(this);
        this.rotatePlayer = this.rotatePlayer.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        document.addEventListener('keydown', this.handleKeyDown);
    }

    startObstacleGeneration() {
        if (!this.hasMoved) return;

        setInterval(() => {
            this.generateObstacle();
        }, 2000); 
    }

    generateObstacle() {
        let newObstacle;
        let validPosition = false;

        while (!validPosition) {
            newObstacle = new Obstacle(this.boardElm, 40, 20);  
            validPosition = this.checkPositionCollision(newObstacle);
        }

        this.obstacles.push(newObstacle);
        this.occupiedPositions.push(newObstacle.position);
    }

    checkPositionCollision(newObstacle) {
        for (let position of this.occupiedPositions) {
            if (this.isCollision(newObstacle, position)) {
                return false; 
            }
        }

        return true; 
    }

    isCollision(newObstacle, existingPosition) {
        const newLeft = newObstacle.element.offsetLeft;
        const newBottom = newObstacle.element.offsetTop;
        const existingLeft = existingPosition.left;
        const existingBottom = existingPosition.bottom;
        const newWidth = newObstacle.width;
        const newHeight = newObstacle.height;

        return (
            newLeft < existingLeft + newWidth &&
            newLeft + newWidth > existingLeft &&
            newBottom < existingBottom + newHeight &&
            newBottom + newHeight > existingBottom
        );
    }

    movePlayer() {
        if (!this.isAlive) return;

        const boardRect = this.boardElm.getBoundingClientRect();  
        const playerRect = this.playerElm.getBoundingClientRect();

        if (this.direction === 'ArrowUp') {
            if (playerRect.top <= boardRect.top) return this.die();
            this.positionY += 1;
            this.playerElm.style.bottom = `${this.positionY}px`;
        } else if (this.direction === 'ArrowDown') {
            if (playerRect.bottom >= boardRect.bottom) return this.die();
            this.positionY -= 1;
            this.playerElm.style.bottom = `${this.positionY}px`;
        } else if (this.direction === 'ArrowLeft') {
            if (playerRect.left <= boardRect.left) return this.die();
            this.positionX -= 1;
            this.playerElm.style.left = `${this.positionX}px`;
        } else if (this.direction === 'ArrowRight') {
            if (playerRect.right >= boardRect.right) return this.die();
            this.positionX += 1;
            this.playerElm.style.left = `${this.positionX}px`;
        }

        if (!this.hasMoved) {
            this.hasMoved = true; 
            this.startObstacleGeneration(); 
        }
    }

    rotatePlayer(dir) {
        const rotationMap = {
            ArrowUp: '90deg',
            ArrowRight: '180deg',
            ArrowDown: '270deg',
            ArrowLeft: '360deg',
        };
        this.playerElm.style.transform = `rotate(${rotationMap[dir]})`;
    }

    handleKeyDown(e) {
        if (!this.isAlive) return;

        if (this.validDirections.includes(e.code) && e.code !== this.direction) {
            this.direction = e.code;
            this.rotatePlayer(this.direction);

            if (this.intervalId) {
                clearInterval(this.intervalId);
            }

            this.intervalId = setInterval(this.movePlayer, 6);
        }
    }

    die() {
        this.isAlive = false;
        this.stopMoving();
        alert('Game Over! Você bateu na parede.');
    }

    stopMoving() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}

class Obstacle {
    constructor(boardElm, width = 40, height = 20) {
        this.boardElm = boardElm;
        this.width = width;
        this.height = height;
        this.element = document.createElement('div');

        this.element.classList.add('obstacle');
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;

        this.position = this.setPositionRandomly();

        this.boardElm.appendChild(this.element);
    }

    setPositionRandomly() {
        const maxLeft = this.boardElm.clientWidth - this.width;
        const maxBottom = this.boardElm.clientHeight - this.height;

        let randomLeft = Math.floor(Math.random() * maxLeft);
        let randomBottom = Math.floor(Math.random() * maxBottom);

        this.element.style.left = `${randomLeft}px`;
        this.element.style.bottom = `${randomBottom}px`;

        return { left: randomLeft, bottom: randomBottom };
    }
}

window.onload = () => {
    new PlayerMover('player', 'board');
};









