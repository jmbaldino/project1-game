// const playerElm = document.getElementById('player');

// let positionX = 0
// let positionY = 0
// let direction = null
// let intervalId = null

// function movePlayer() {
//     if (direction === 'ArrowUp') {
//         positionY += 3;
//         playerElm.style.bottom = `${positionY}px`;
//     } else if (direction === 'ArrowDown') {
//         positionY -= 3;
//         playerElm.style.bottom = `${positionY}px`;
//     } else if (direction === 'ArrowLeft') {
//         positionX -= 3;
//         playerElm.style.left = `${positionX}px`;
//     } else if (direction === 'ArrowRight') {
//         positionX += 3;
//         playerElm.style.left = `${positionX}px`;
//     }
// }

// function rotatePlayer(dir) {
//     const rotationMap = {
//         ArrowUp: '0deg',
//         ArrowRight: '90deg',
//         ArrowDown: '180deg',
//         ArrowLeft: '270deg',
//     };
//     playerElm.style.transform = `rotate(${rotationMap[dir]})`;
// }

// document.addEventListener('keydown', (e) => {
//     const validDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
//     if (validDirections.includes(e.code) && e.code !== direction) {
//         direction = e.code

//         if (intervalId) {
//             clearInterval(intervalId)
//         }

//         intervalId = setInterval(movePlayer, 20)
//     }
// })

const playerElm = document.getElementById('player');

let positionX = 0;
let positionY = 0;
let direction = null;
let intervalId = null;

function movePlayer() {
    if (direction === 'ArrowUp') {
        positionY += 3;
        playerElm.style.bottom = `${positionY}px`;
    } else if (direction === 'ArrowDown') {
        positionY -= 3;
        playerElm.style.bottom = `${positionY}px`;
    } else if (direction === 'ArrowLeft') {
        positionX -= 3;
        playerElm.style.left = `${positionX}px`;
    } else if (direction === 'ArrowRight') {
        positionX += 3;
        playerElm.style.left = `${positionX}px`;
    }
}

function rotatePlayer(dir) {
    const rotationMap = {
        ArrowUp: '90deg',
        ArrowRight: '180deg',
        ArrowDown: '270deg',
        ArrowLeft: '360deg',
    };
    playerElm.style.transform = `rotate(${rotationMap[dir]})`;
}

document.addEventListener('keydown', (e) => {
    const validDirections = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (validDirections.includes(e.code) && e.code !== direction) {
        direction = e.code;
        rotatePlayer(direction);

        if (intervalId) {
            clearInterval(intervalId);
        }

        intervalId = setInterval(movePlayer, 20);
    }
});
