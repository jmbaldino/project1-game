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
        }, 3000);
    }

    generateObstacle() {
        let newObstacle;
        let validPosition = false;
        let attempts = 0;
        const maxAttempts = 100;

        while (!validPosition && attempts < maxAttempts) {
            newObstacle = new Obstacle(this.boardElm, 40, 20);
            validPosition = this.checkPositionCollision(newObstacle);
            attempts++;

            if (!validPosition) {
                this.boardElm.removeChild(newObstacle.element);
            }
        }

        if (validPosition) {
            this.obstacles.push(newObstacle);
            this.occupiedPositions.push({
                left: newObstacle.position.left,
                bottom: newObstacle.position.bottom,
                width: newObstacle.width,
                height: newObstacle.height
            });
        }
    }

    checkPositionCollision(newObstacle) {
        const newLeft = newObstacle.position.left;
        const newBottom = newObstacle.position.bottom;
        const newRight = newLeft + newObstacle.width;
        const newTop = newBottom + newObstacle.height;

        for (let obstacle of this.occupiedPositions) {
            const existingLeft = obstacle.left;
            const existingBottom = obstacle.bottom;
            const existingRight = existingLeft + obstacle.width;
            const existingTop = existingBottom + obstacle.height;

            if (!(newRight <= existingLeft || 
                  newLeft >= existingRight || 
                  newTop <= existingBottom || 
                  newBottom >= existingTop)) {
                return false;
            }
        }
        return true;
    }

    
    movePlayer() {
        if (!this.isAlive) return;
    
        const step = 20; 
    
        if (this.direction === 'ArrowUp') {
            if (this.positionY + this.playerElm.offsetHeight >= this.boardElm.clientHeight) return this.die();
            this.positionY += step;
            this.playerElm.style.bottom = `${this.positionY}px`;
        } else if (this.direction === 'ArrowDown') {
            if (this.positionY <= 0) return this.die();
            this.positionY -= step;
            this.playerElm.style.bottom = `${this.positionY}px`;
        } else if (this.direction === 'ArrowLeft') {
            if (this.positionX <= 0) return this.die();
            this.positionX -= step;
            this.playerElm.style.left = `${this.positionX}px`;
        } else if (this.direction === 'ArrowRight') {
            if (this.positionX + this.playerElm.offsetWidth >= this.boardElm.clientWidth) return this.die();
            this.positionX += step;
            this.playerElm.style.left = `${this.positionX}px`;
        }
    
        const playerLeft = this.positionX;
        const playerRight = this.positionX + this.playerElm.offsetWidth;
        const playerBottom = this.positionY;
        const playerTop = this.positionY + this.playerElm.offsetHeight;
    
        for (let obstacle of this.obstacles) {
            const obsLeft = parseInt(obstacle.element.style.left, 10);
            const obsBottom = parseInt(obstacle.element.style.bottom, 10);
            const obsRight = obsLeft + obstacle.element.offsetWidth;
            const obsTop = obsBottom + obstacle.element.offsetHeight;
    
            const isColliding = !(
                playerRight <= obsLeft ||
                playerLeft >= obsRight ||
                playerTop <= obsBottom ||
                playerBottom >= obsTop
            );
    
            if (isColliding) {
                return this.die();
            }
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

            this.intervalId = setInterval(this.movePlayer, 200);
        }
    }

    die() {
        this.isAlive = false;
        this.stopMoving();
        alert('Game Over!');
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

