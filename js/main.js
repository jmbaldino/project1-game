
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

        this.movePlayer = this.movePlayer.bind(this);
        this.rotatePlayer = this.rotatePlayer.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        document.addEventListener('keydown', this.handleKeyDown);
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
        alert('Game Over! You hit the wall.');
    }

    stopMoving() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }
}



const playerMover = new PlayerMover('player', 'board');

