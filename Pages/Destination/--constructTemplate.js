import {planets} from "./--data-planets.js"

const planetList = document.querySelector(".destination-planet-list")
const planetImageDOM = document.querySelector(".planet-image")
const planetNameDOM = document.querySelector(".destination-planet-name")
const planetDescriptionDOM = document.querySelector(".destination-planet-description")
const distanceDOM = document.querySelector(".distance")
const travelTimeDOM = document.querySelector(".travelTime")
const planetMask = document.querySelector(".mask")

let dataPlanets = [...planets]


const detectSelectedPlanet = () => {
    const selectedPlanet = dataPlanets.find(planet => planet.selected === true)
    return selectedPlanet
}
const constructTemplate = () => {
    const selectedPlanet = detectSelectedPlanet()
    planetNameDOM.innerHTML = selectedPlanet.name
    planetDescriptionDOM.innerHTML = selectedPlanet.description
    distanceDOM.innerHTML = selectedPlanet.distance
    travelTimeDOM.innerHTML = selectedPlanet.travelTime
    planetImageDOM.src = selectedPlanet.image
}

const constructPlanetList = () => {
    let listOfPlanets = ""
    dataPlanets.forEach(planet => {
        const newPlanet = `<a class="${planet.selected ? "selected" : "onePlanet"}">${planet.name}</a>`
        listOfPlanets += newPlanet
    })
    planetList.innerHTML = listOfPlanets
}

const toggleAnimationChangedPlanet = () => {
    planetNameDOM.classList.add("animationClass_opacity-out-in-1000")
    planetDescriptionDOM.classList.add("animationClass_opacity-out-in-1000")
    distanceDOM.classList.add("animationClass_opacity-out-in-1000")
    travelTimeDOM.classList.add("animationClass_opacity-out-in-1000")
}


// Quand on clique sur le nom d'un planete
const changeSelectedPlanet = (e) => {

    // Construit un nouveau dataPlanets avec la planète cliquer en selected = true
    const planetNameClicked = e.target.innerHTML
    const newDataPlanets = dataPlanets.map(planet => {
        planet.selected = planet.name === planetNameClicked ? true : false
        return planet
    })
    dataPlanets = newDataPlanets


    

    planetMask.classList.add("animationClass_mask-planet-hide-planet") // Ajoute la classe d'animation pour le mask d'ombre sur la planête
    toggleAnimationChangedPlanet() // Ajoute les classe d'animation d'opaciter pour le contenu de la page
    constructPlanetList() // Modifie immédiatement la liste des planètes ( pour avoir le soulignement de la planète sélectionner tout de suite)

    // Ajoute des classes d'animation de désactivation pour les boutons de nom de planète ( afin de ne pas pouvoir spammer trop rapidement et faire sauter les animations )
    const planetsButtons = document.querySelectorAll(".onePlanet")
    planetsButtons.forEach(button => {
        button.classList.add("animationClass_make-disabled-planet-button-list")
    })

    // A la moitier des animations on change le contenu de la page + On rattache les listener
    setTimeout(() => {
        constructTemplate()
        attachListenerPlanetButton()
    }, 500);

    // Quand tout est terminer, on retire les classes d'animation pour le mask
    setTimeout(() => {
        planetMask.classList.remove("animationClass_mask-planet-hide-planet")
        planetNameDOM.classList.remove("animationClass_opacity-out-in-1000")
        planetDescriptionDOM.classList.remove("animationClass_opacity-out-in-1000")
        distanceDOM.classList.remove("animationClass_opacity-out-in-1000")
        travelTimeDOM.classList.remove("animationClass_opacity-out-in-1000")

        const planetsButtons = document.querySelectorAll(".onePlanet")
        planetsButtons.forEach(button => {
            button.classList.remove("animationClass_make-disabled-planet-button-list")
        })
    }, 1000);
}

const attachListenerPlanetButton = () => {
    const planetsButtons = document.querySelectorAll(".onePlanet")
    planetsButtons.forEach(button => {
        button.addEventListener("click", (e) => changeSelectedPlanet(e))
    })
}

const main = () => {
    constructTemplate()
    constructPlanetList()
    attachListenerPlanetButton()
}

main()



