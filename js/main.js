const playerElm = document.getElementById('player');

let positionX = 0
let positionY = 0

document.addEventListener(`keydown` , (e) => {
    if (e.code === `ArrowUp`) {
        positionY+=3
        playerElm.style.bottom = `${positionY}px`
    } else if (e.code === `ArrowDown`) {
        positionY-=3
        playerElm.style.bottom = `${positionY}px`
    } else if (e.code === `ArrowLeft`) {
        positionX-=3
        playerElm.style.left = `${positionX}px`
    } else if (e.code === `ArrowRight`) {
        positionX+=3
        playerElm.style.left = `${positionX}px`
    }
})