import {crews} from "./--data-crew.js"

const crewNameDOM = document.querySelector(".crew-name")
const crewRoleDOM = document.querySelector(".crew-role")
const crewPresentationDOM = document.querySelector(".crew-presentation")
const crewPhotoDOM = document.querySelector(".photo")
const crewCarouselPoints = document.querySelector(".crew-carousel")

let dataCrews = [...crews]

const detectSelectedCrew = () => {
    const selectedCrewMember = dataCrews.find(crewMember => crewMember.selected === true)
    return selectedCrewMember
}

const constructTemplate = () => {
    const selectedCrewMember = detectSelectedCrew()
    crewNameDOM.innerHTML = selectedCrewMember.name
    crewRoleDOM.innerHTML = selectedCrewMember.role
    crewPresentationDOM.innerHTML = selectedCrewMember.presentation
    crewPhotoDOM.src = selectedCrewMember.image
    crewPhotoDOM.dataset.membername = selectedCrewMember.name
}

const constructCarouselPoint = () => {
    let points = ""
    dataCrews.forEach(crewMember => {
        points += `<li data-membername="${crewMember.name}" class=${crewMember.selected ? "selected" : "unselected"}></li>`
    })
    crewCarouselPoints.innerHTML = points
}

export const toggleAnimationChangedCrewMember = () => {
    crewNameDOM.classList.add("animationClass_opacity-out-in-1000")
    crewRoleDOM.classList.add("animationClass_opacity-out-in-1000")
    crewPresentationDOM.classList.add("animationClass_opacity-out-in-1000")
    crewPhotoDOM.classList.add("animationClass_opacity-out-in-1000")
}

export const changeSelectedCrewMember = (e, manuallySelectedMember = null) => {
    if(!manuallySelectedMember && e){
        const memberNameClicked = e?.srcElement?.dataset?.membername
        if(memberNameClicked)
        {
            const newDataCrew = dataCrews.map(crewMember => {
                crewMember.selected = crewMember.name === memberNameClicked ? true : false
                return crewMember
            })
            dataCrews = newDataCrew
            constructCarouselPoint()
            toggleAnimationChangedCrewMember()
            setTimeout(() => {
                constructTemplate()
                attachListenerCarouselPoint()
            }, 500);

            setTimeout(() => {
                crewNameDOM.classList.remove("animationClass_opacity-out-in-1000")
                crewRoleDOM.classList.remove("animationClass_opacity-out-in-1000")
                crewPresentationDOM.classList.remove("animationClass_opacity-out-in-1000")
                crewPhotoDOM.classList.remove("animationClass_opacity-out-in-1000")
            }, 1000);
        }
    }
    
    if(!e && manuallySelectedMember){
        const newDataCrew = dataCrews.map(crewMember => {
            crewMember.selected = crewMember.name === manuallySelectedMember ? true : false
            return crewMember
        })
        dataCrews = newDataCrew
        main()
    }
}

const attachListenerCarouselPoint = () => {
    const clickablePoint = document.querySelectorAll(".unselected")
    clickablePoint.forEach(point => {
        point.addEventListener("click", (e) => changeSelectedCrewMember(e))
    })
    
}

const main = () => {
    constructTemplate()
    constructCarouselPoint()
    attachListenerCarouselPoint()
}

main()
