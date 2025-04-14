const playerElm = document.getElementById('player')
const boardElm = document.getElementById('board')

let positionX = 0
let positionY = 0
let direction = null
let intervalId = null

function movePlayer() {
    const boardRect = boardElm.getBoundingClientRect();  
    const playerRect = playerElm.getBoundingClientRect();

    

    if (direction === 'ArrowUp') {
        if (playerRect.top > boardRect.top) {
            positionY += 1;
            playerElm.style.bottom = `${positionY}px`;
        }
    } else if (direction === 'ArrowDown') {
        if (playerRect.bottom < boardRect.bottom) {
            positionY -= 1;
            playerElm.style.bottom = `${positionY}px`;
        }
    } else if (direction === 'ArrowLeft') {
        if (playerRect.left > boardRect.left) { 
            positionX -= 1;
            playerElm.style.left = `${positionX}px`;
        }
    } else if (direction === 'ArrowRight') {
        if (playerRect.right < boardRect.right) {
            positionX += 1;
            playerElm.style.left = `${positionX}px`;
        }
    }
}

function rotatePlayer(dir) {
    const rotationMap = {
        ArrowUp: '90deg',
        ArrowRight: '180deg',
        ArrowDown: '270deg',
        ArrowLeft: '360deg',
    };
    playerElm.style.transform = `rotate(${rotationMap[dir]})`
}

document.addEventListener('keydown', (e) => {
    const validDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
    if (validDirections.includes(e.code) && e.code !== direction) {
        direction = e.code
        rotatePlayer(direction)

        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(movePlayer, 8)
    }
})
