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
    const direction =   touchEndX < touchStartX ? "right" :
                        touchEndX > touchStartX ? "left" :
                        null
    
    if(direction){
        const nextCrewMemberName = determineNextMemberCrew(e.target.dataset.membername, direction)
        // Si aucun prochain membre d'équipage trouver, on repositionne l'image au centre ou si l'image n'a pas été suffisament déplacer (150px de décalage )

        if(!nextCrewMemberName 
            || 
            (direction === "right" ? 
            touchStartX - touchEndX < 150 : 
            touchEndX - touchStartX < 150)
        ){ 
            photoDOM.style.left = initialLeft // Retour à la position initial
            resetOpacity() // Reset de l'opacité
            return
        }else{
            // Sinon le swipe est valider
            console.log(`Swiped ${direction}`);
            // On détermine l'opacité de l'image à 0 pour permettre son déplacement de l'autre coté sans pouvoir être vu
            photoDOM.style.opacity = 0
            // On change le membre de l'équipage à afficher
            changeSelectedCrewMember(null, nextCrewMemberName)
            // Selon la position initial on place l'image de l'autre coté
            photoDOM.style.left = `${initialLeft - (parseInt(photoDOM.style.left) / 2)}px`
            // Une fois la nouvelle image positionner de l'autre coté, et toujours camoufler avec l'opacité, on peut la faire revenir au centre et l'afficher de nouveau.
            setTimeout(() => {
                photoDOM.style.left = initialLeft
                resetOpacity()
            }, 300);
        }
    }
}

const determineNextMemberCrew = (crewMemberName, direction) => {
    const memberIndex = crews.findIndex(crewMember => crewMember.name === `${crewMemberName}`)
    return crews[
        direction === "right" ? memberIndex + 1 : 
        direction === "left" ? memberIndex - 1 : 
        memberIndex
                ]?.name || false
}



