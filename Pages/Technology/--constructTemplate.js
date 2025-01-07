import {technology} from "./--data-technology.js"

const technoNameDOM = document.querySelector(".techno-name")
const technoPresentationDOM = document.querySelector(".techno-description")
const technoPhotoDOM = document.querySelector(".photo")
const technoCarouselPoints = document.querySelector(".techno-carousel")


let dataTechnology = technology

const detectSelectedCrew = () => {
    const selectedTechnology = dataTechnology.find(technology => technology.selected === true)
    return selectedTechnology
}

const constructTemplate = () => {
    const selectedTechnology = detectSelectedCrew()
    technoNameDOM.innerHTML = selectedTechnology.name
    technoPresentationDOM.innerHTML = selectedTechnology.presentation
    technoPhotoDOM.src = selectedTechnology.image
}

const constructCarouselPoint = () => {
    let points = ""
    dataTechnology.forEach((technology, index) => {
        points += `<button data-name="${technology.name}" class=${technology.selected ? "selected" : "unselected"}>${index + 1}</button>`
    })
    technoCarouselPoints.innerHTML = points
}

export const toggleAnimationChangedTechnology = () => {
    technoNameDOM.classList.add("animationClass_opacity-out-in-1000")
    technoPresentationDOM.classList.add("animationClass_opacity-out-in-1000")
    technoPhotoDOM.classList.add("animationClass_opacity-out-in-1000")
}

export const changeSelectedTechnology = (e, manuallySelectedMember = null) => {
    if(!manuallySelectedMember && e){
        const memberNameClicked = e?.srcElement?.dataset?.name
        if(memberNameClicked)
        {
            const newDataCrew = dataTechnology.map(technology => {
                technology.selected = technology.name === memberNameClicked ? true : false
                return technology
            })
            dataTechnology = newDataCrew
            constructCarouselPoint()
            toggleAnimationChangedTechnology()
            const technologyButtons = document.querySelectorAll(".unselected")
            technologyButtons.forEach(button => {
                button.classList.add("animationClass_make-disabled")
            })
            setTimeout(() => {
                constructTemplate()
                attachListenerCarouselPoint()
            }, 500);

            setTimeout(() => {
                technoNameDOM.classList.remove("animationClass_opacity-out-in-1000")
                technoPresentationDOM.classList.remove("animationClass_opacity-out-in-1000")
                technoPhotoDOM.classList.remove("animationClass_opacity-out-in-1000")

                const technologyButtons = document.querySelectorAll(".unselected")
                technologyButtons.forEach(button => {
                    button.classList.remove("animationClass_make-disabled")
                })
            }, 1000);
        }
    }
    
    if(!e && manuallySelectedMember){
        const newDataCrew = dataTechnology.map(technology => {
            technology.selected = technology.name === manuallySelectedMember ? true : false
            return technology
        })
        dataTechnology = newDataCrew
        main()
    }
}

const attachListenerCarouselPoint = () => {
    const clickablePoint = document.querySelectorAll(".unselected")
    clickablePoint.forEach(point => {
        point.addEventListener("click", (e) => changeSelectedTechnology(e))
    })
    
}

const main = () => {
    constructTemplate()
    constructCarouselPoint()
    attachListenerCarouselPoint()
}

main()
