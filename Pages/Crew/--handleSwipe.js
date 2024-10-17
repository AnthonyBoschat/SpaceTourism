import {crews} from "./--data-crew.js"
import {changeSelectedCrewMember, toggleAnimationChangedCrewMember} from "./--constructTemplate.js";

const photoDOM = document.querySelector(".photo")
const crewNameDOM = document.querySelector(".crew-name")
const crewRoleDOM = document.querySelector(".crew-role")
const crewPresentationDOM = document.querySelector(".crew-presentation")
let touchStartX = 0
let touchEndX = 0
let initialLeft = 0;
let isDragging = false;


// Reset les opacity des éléments toucher les animations
const resetOpacity = () => {
    photoDOM.style.opacity = 1
    crewNameDOM.style.opacity = 1
    crewRoleDOM.style.opacity = 1
    crewPresentationDOM.style.opacity = 1
}



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
        photoDOM.style.opacity = `${1 - (Math.abs(moveX / 327) * 4)}` // Opacity en fonction de la distance parcouru
        crewNameDOM.style.opacity = `${1 - (Math.abs(moveX / 327) * 4)}` // Opacity en fonction de la distance parcouru
        crewRoleDOM.style.opacity = `${1 - (Math.abs(moveX / 327) * 4)}` // Opacity en fonction de la distance parcouru
        crewPresentationDOM.style.opacity = `${1 - (Math.abs(moveX / 327) * 4)}` // Opacity en fonction de la distance parcouru
    }
})

photoDOM.addEventListener("touchend", (e) => {
    isDragging = false; // Arrête le déplacement
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe(e, touchEndX); // A la fin du déplacement on détermine l'action à effectuer
})


// Détermine l'action à effectuer après le listener touchend
function handleSwipe(e, touchEndX) {
    // Si swiper vers la droite
    if (touchEndX < touchStartX) {
        if(touchStartX - touchEndX < 150){ // Limite à partir de laquelle le crewMember change = déplacement de 150px, si pas assez
            photoDOM.style.left = initialLeft // Retour à la position initial
            resetOpacity() // Reset de l'opaciter
            console.log("not so long")
            return
        }
        // Sinon le swipe est valider
        console.log('Swiped right');
        // On détermine 
        photoDOM.style.opacity = 0
        photoDOM.style.left = `${initialLeft - (parseInt(photoDOM.style.left) / 2)}px`
        determineNextMemberCrew(e.target.dataset.membername, "right")
        setTimeout(() => {
            
            photoDOM.style.left = initialLeft
            resetOpacity()
        }, 300);
    }

    // Si swiper vers la gauche
    if (touchEndX > touchStartX) {
        if(touchEndX - touchStartX < 150){ // Limite à partir de laquelle le crewMember change = déplacement de 150px
            photoDOM.style.left = initialLeft
            resetOpacity()
            console.log("not so long")
            return
        }
        console.log('Swiped left');
        determineNextMemberCrew(e.target.dataset.membername, "left")
        photoDOM.style.opacity = 0
        photoDOM.style.left = `${initialLeft - (parseInt(photoDOM.style.left) / 2)}px`
        setTimeout(() => {
            photoDOM.style.left = initialLeft
            resetOpacity()
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
}



