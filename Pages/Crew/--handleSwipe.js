import {crews} from "./--data-crew.js"
import {changeSelectedCrewMember} from "./--constructTemplate.js";

const photoDOM = document.querySelector(".photo")
let touchStartX = 0
let touchEndX = 0
let initialLeft = 0;
let isDragging = false;

photoDOM.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX
    initialLeft = parseInt(window.getComputedStyle(photoDOM).left) || 0 // Stocke la position initiale de l'image
    isDragging = true;
})

photoDOM.addEventListener("touchmove", (e) => {
    e.preventDefault()
    if (isDragging) {
        let currentX = e.changedTouches[0].screenX;
        let moveX = currentX - touchStartX;
        photoDOM.style.left = `${(initialLeft + moveX)/ 2}px`; // Déplace l'image en fonction du swipe
        photoDOM.style.opacity = `${1 - (Math.abs(moveX / 327) * 4)}`
    }
})

photoDOM.addEventListener("touchend", (e) => {
    isDragging = false; // Arrête le déplacement
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(e, touchEndX);
})

function handleSwipe(e, touchEndX) {
    if (touchEndX < touchStartX) {
        if(touchStartX - touchEndX < 150){
            photoDOM.style.left = initialLeft
            photoDOM.style.opacity = 1
            console.log("not so long")
            return
        }
        console.log('Swiped right');
        determineNextMemberCrew(e.target.dataset.membername, "right")
        photoDOM.style.opacity = 0
        photoDOM.style.left = `${initialLeft - (parseInt(photoDOM.style.left) / 2)}px`
        setTimeout(() => {
            
            photoDOM.style.left = initialLeft
            photoDOM.style.opacity = 1
        }, 300);
    }
    if (touchEndX > touchStartX) {
        if(touchEndX - touchStartX < 150){
            photoDOM.style.left = initialLeft
            photoDOM.style.opacity = 1
            console.log("not so long")
            return
        }
        console.log('Swiped left');
        determineNextMemberCrew(e.target.dataset.membername, "left")
        photoDOM.style.opacity = 0
        photoDOM.style.left = `${initialLeft - (parseInt(photoDOM.style.left) / 2)}px`
        setTimeout(() => {
            photoDOM.style.left = initialLeft
            photoDOM.style.opacity = 1
        }, 300);

    }
}

const determineNextMemberCrew = (crewMemberName, direction) => {
    const memberIndex = crews.findIndex(crewMember => crewMember.name === `${crewMemberName}`)
    switch(direction){

        case "right":
            if(crews[memberIndex + 1]){
                changeSelectedCrewMember(null, crews[memberIndex + 1].name)   
            }
            return

        case "left":
            if(crews[memberIndex - 1]){
                changeSelectedCrewMember(null, crews[memberIndex - 1].name)   
            }
            return
            
        default:
            return
    }
    console.log(imagelink)
}



